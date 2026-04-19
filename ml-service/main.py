"""
Saheli ML Microservice — FastAPI Server
Serves trained scikit-learn models for:
  1. Skill recommendations (POST /predict/skills)
  2. Scheme recommendations (POST /predict/schemes)

Models are loaded once at startup for blazing-fast inference.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import joblib
import numpy as np
import os

# ──────────────────── App Setup ────────────────────
app = FastAPI(title="Saheli ML Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────── Load Models at Startup ────────────────────
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")

# Skills models
skills_model = None
skills_interest_enc = None
skills_time_enc = None
skills_goal_enc = None
skills_skill_enc = None
skills_df = None

# Scheme models
scheme_model = None
scheme_scaler = None
scheme_emp_enc = None
scheme_cat_enc = None
scheme_df = None


@app.on_event("startup")
def load_models():
    global skills_model, skills_interest_enc, skills_time_enc, skills_goal_enc, skills_skill_enc, skills_df
    global scheme_model, scheme_scaler, scheme_emp_enc, scheme_cat_enc, scheme_df

    try:
        skills_model = joblib.load(os.path.join(MODELS_DIR, "skills_model.pkl"))
        skills_interest_enc = joblib.load(os.path.join(MODELS_DIR, "skills_interest_encoder.pkl"))
        skills_time_enc = joblib.load(os.path.join(MODELS_DIR, "skills_time_encoder.pkl"))
        skills_goal_enc = joblib.load(os.path.join(MODELS_DIR, "skills_goal_encoder.pkl"))
        skills_skill_enc = joblib.load(os.path.join(MODELS_DIR, "skills_skill_encoder.pkl"))
        skills_df = joblib.load(os.path.join(MODELS_DIR, "skills_dataframe.pkl"))
        print("[OK] Skills models loaded.")
    except Exception as e:
        print(f"[WARN] Could not load skills models: {e}")

    try:
        scheme_model = joblib.load(os.path.join(MODELS_DIR, "scheme_model.pkl"))
        scheme_scaler = joblib.load(os.path.join(MODELS_DIR, "scheme_scaler.pkl"))
        scheme_emp_enc = joblib.load(os.path.join(MODELS_DIR, "scheme_emp_encoder.pkl"))
        scheme_cat_enc = joblib.load(os.path.join(MODELS_DIR, "scheme_cat_encoder.pkl"))
        scheme_df = joblib.load(os.path.join(MODELS_DIR, "scheme_dataframe.pkl"))
        print("[OK] Scheme models loaded.")
    except Exception as e:
        print(f"[WARN] Could not load scheme models: {e}")


# ──────────────────── Request Schemas ────────────────────

class SkillPredictRequest(BaseModel):
    interest: str       # e.g. "Working with hands"
    time: str           # e.g. "3-4 hours"
    goal: str           # e.g. "Start my own micro-business"

class SchemePredictRequest(BaseModel):
    age: Optional[int] = 25
    income: Optional[int] = 200000
    employmentStatus: Optional[str] = "Self-employed"
    state: Optional[str] = "Maharashtra"


# ──────────────────── Health Check ────────────────────

@app.get("/")
def health():
    return {"status": "ok", "service": "Saheli ML Service"}


# ──────────────────── Skill Prediction ────────────────────

@app.post("/predict/skills")
def predict_skills(req: SkillPredictRequest):
    if skills_model is None:
        raise HTTPException(status_code=503, detail="Skills model not loaded")

    try:
        # Encode inputs
        interest_enc = skills_interest_enc.transform([req.interest])[0]
        time_enc = skills_time_enc.transform([req.time])[0]
        goal_enc = skills_goal_enc.transform([req.goal])[0]

        features = np.array([[interest_enc, time_enc, goal_enc]])

        # Get prediction probabilities from Random Forest
        probabilities = skills_model.predict_proba(features)[0]

        # Get top 3 predictions by probability
        top_indices = np.argsort(probabilities)[::-1][:3]

        results = []
        for idx in top_indices:
            skill_name = skills_skill_enc.inverse_transform([idx])[0]
            match_pct = round(probabilities[idx] * 100)

            # Look up duration from the original dataframe
            duration_row = skills_df[skills_df["recommended_skill"] == skill_name]
            duration = duration_row["duration"].values[0] if len(duration_row) > 0 else "TBD"

            if match_pct > 0:
                results.append({
                    "title": skill_name,
                    "match": f"{match_pct}% Match",
                    "duration": duration,
                })

        return results if results else [{"title": "Digital Literacy Basics", "match": "90% Match", "duration": "1 Month"}]

    except ValueError as e:
        # Handle unknown categories gracefully
        return [{"title": "Digital Literacy Basics", "match": "85% Match", "duration": "1 Month"}]


# ──────────────────── Scheme Prediction ────────────────────

@app.post("/predict/schemes")
def predict_schemes(req: SchemePredictRequest):
    if scheme_model is None:
        raise HTTPException(status_code=503, detail="Scheme model not loaded")

    try:
        # Map user employment to the encoder; handle partial matches
        emp_status = req.employmentStatus or "Self-employed"
        
        # Try to find matching employment category
        known_emp = list(scheme_emp_enc.classes_)
        if emp_status not in known_emp:
            emp_status = "All"

        emp_enc = scheme_emp_enc.transform([emp_status])[0]

        # We want schemes across all categories, so we try multiple category queries
        # and merge. But the simplest approach: create a "user vector" using average
        # category and find nearest schemes.
        cat_enc = 0  # default to Financial

        user_features = np.array([[cat_enc, emp_enc, req.age, req.age, req.income]], dtype=float)
        user_features_scaled = scheme_scaler.transform(user_features)

        # Find nearest schemes
        distances, indices = scheme_model.kneighbors(user_features_scaled)

        results = []
        for rank, (dist, idx) in enumerate(zip(distances[0], indices[0])):
            row = scheme_df.iloc[idx]

            # Calculate a match score inversely proportional to distance
            # Closer distance = higher match
            match_score = max(10, int(100 - (dist * 40)))

            # Also apply eligibility filtering - boost if user actually qualifies
            age_eligible = row["min_age"] <= req.age <= row["max_age"]
            income_eligible = req.income <= row["max_income"]
            emp_eligible = row["target_employment"] == "All" or row["target_employment"] == req.employmentStatus

            if age_eligible:
                match_score = min(99, match_score + 5)
            if income_eligible:
                match_score = min(99, match_score + 5)
            if emp_eligible:
                match_score = min(99, match_score + 10)

            results.append({
                "scheme_name": row["scheme_name"],
                "category": row["category"],
                "match_score": match_score,
                "description": row["description"],
                "link": row["link"],
                "eligibility": f"Ages {row['min_age']}-{row['max_age']}, Income up to ₹{row['max_income']:,}",
            })

        # Sort by match score descending
        results.sort(key=lambda x: x["match_score"], reverse=True)
        return results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ──────────────────── Run ────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

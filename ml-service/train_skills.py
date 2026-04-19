"""
Train the Skills Recommendation Model.
Uses a Random Forest Classifier to predict the best skill based on quiz answers,
and outputs a probability-based match score.
"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

def main():
    print("=== Training Skills Prediction Model ===")
    
    # Load dataset
    data_path = os.path.join(os.path.dirname(__file__), "data", "skills_dataset.csv")
    df = pd.read_csv(data_path)
    print(f"Loaded {len(df)} training samples.")
    
    # Encode input features
    interest_encoder = LabelEncoder()
    time_encoder = LabelEncoder()
    goal_encoder = LabelEncoder()
    skill_encoder = LabelEncoder()
    
    interest_categories = [
        "Working with hands", 
        "Interacting with people", 
        "Organizing things and data", 
        "Cooking or Food Prep"
    ]
    time_categories = ["1-2 hours", "3-4 hours", "Full time", "Weekends only"]
    goal_categories = [
        "Earn a side income from home",
        "Start my own micro-business",
        "Find a local full-time job",
        "Gain digital literacy"
    ]
    
    interest_encoder.fit(interest_categories)
    time_encoder.fit(time_categories)
    goal_encoder.fit(goal_categories)
    skill_encoder.fit(df["recommended_skill"].unique())
    
    # Build feature matrix
    X = np.column_stack([
        interest_encoder.transform(df["interest"]),
        time_encoder.transform(df["time_availability"]),
        goal_encoder.transform(df["goal"])
    ])
    
    # Target: the recommended skill
    y = skill_encoder.transform(df["recommended_skill"])
    
    # Train a Random Forest Classifier
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    model.fit(X, y)
    
    # Evaluate on training data (for sanity check)
    train_accuracy = model.score(X, y)
    print(f"Training accuracy: {train_accuracy:.2%}")
    
    # Save everything
    models_dir = os.path.join(os.path.dirname(__file__), "models")
    os.makedirs(models_dir, exist_ok=True)
    
    joblib.dump(model, os.path.join(models_dir, "skills_model.pkl"))
    joblib.dump(interest_encoder, os.path.join(models_dir, "skills_interest_encoder.pkl"))
    joblib.dump(time_encoder, os.path.join(models_dir, "skills_time_encoder.pkl"))
    joblib.dump(goal_encoder, os.path.join(models_dir, "skills_goal_encoder.pkl"))
    joblib.dump(skill_encoder, os.path.join(models_dir, "skills_skill_encoder.pkl"))
    
    # Also save the original dataframe for duration lookup
    joblib.dump(df, os.path.join(models_dir, "skills_dataframe.pkl"))
    
    print(f"All artifacts saved to {models_dir}/")
    print("Done!")

if __name__ == "__main__":
    main()

"""
Train the Scheme Recommendation Model.
Uses KNN (K-Nearest Neighbors) to match user profiles to eligible government schemes.
"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.neighbors import NearestNeighbors
import joblib
import os

def main():
    print("=== Training Scheme Recommendation Model ===")
    
    # Load dataset
    data_path = os.path.join(os.path.dirname(__file__), "data", "schemes_dataset.csv")
    df = pd.read_csv(data_path)
    print(f"Loaded {len(df)} schemes from dataset.")
    
    # Encode categorical features for the scheme profiles
    employment_encoder = LabelEncoder()
    category_encoder = LabelEncoder()
    
    # Fit encoders on known categories
    employment_categories = ["Self-employed", "Homemaker", "Student", "Unemployed", "Part-time", "All"]
    category_types = ["Financial", "Business", "Skill", "Employment", "Education", "Safety"]
    
    employment_encoder.fit(employment_categories)
    category_encoder.fit(category_types)
    
    # Build feature matrix for each scheme
    # Features: [category_encoded, employment_encoded, min_age, max_age, max_income_normalized]
    scaler = MinMaxScaler()
    
    scheme_features = []
    for _, row in df.iterrows():
        cat_enc = category_encoder.transform([row["category"]])[0]
        emp_enc = employment_encoder.transform([row["target_employment"]])[0]
        scheme_features.append([
            cat_enc,
            emp_enc,
            row["min_age"],
            row["max_age"],
            row["max_income"]
        ])
    
    scheme_features = np.array(scheme_features, dtype=float)
    scheme_features_scaled = scaler.fit_transform(scheme_features)
    
    # Train a NearestNeighbors model — we use this to find the closest schemes to a user profile
    model = NearestNeighbors(n_neighbors=min(5, len(df)), metric="euclidean")
    model.fit(scheme_features_scaled)
    
    print("Model trained successfully.")
    
    # Save everything
    models_dir = os.path.join(os.path.dirname(__file__), "models")
    os.makedirs(models_dir, exist_ok=True)
    
    joblib.dump(model, os.path.join(models_dir, "scheme_model.pkl"))
    joblib.dump(scaler, os.path.join(models_dir, "scheme_scaler.pkl"))
    joblib.dump(employment_encoder, os.path.join(models_dir, "scheme_emp_encoder.pkl"))
    joblib.dump(category_encoder, os.path.join(models_dir, "scheme_cat_encoder.pkl"))
    joblib.dump(df, os.path.join(models_dir, "scheme_dataframe.pkl"))
    
    print(f"All artifacts saved to {models_dir}/")
    print("Done!")

if __name__ == "__main__":
    main()

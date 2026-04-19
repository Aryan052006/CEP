# 🌸 Saheli — Women Empowerment Platform

A modern, mobile-first, full-stack web application empowering rural and semi-urban women in India to discover government schemes, learn income-generating skills, connect with mentors, showcase products, and achieve financial independence.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                │
│                 http://localhost:3000                │
│  React 19 · Tailwind CSS 4 · Framer Motion          │
│  i18n (English, Hindi, Marathi) · AuthContext        │
└───────────────────┬─────────────────────────────────┘
                    │  HTTP (REST)
                    ▼
┌─────────────────────────────────────────────────────┐
│                  Backend (Node.js)                   │
│                 http://localhost:5000                │
│  Express 5 · MongoDB (Mongoose) · JWT Auth           │
│  Routes: /api/auth · /api/content · /api/ml          │
└───────────────────┬─────────────────────────────────┘
                    │  HTTP (REST)
                    ▼
┌─────────────────────────────────────────────────────┐
│               ML Service (Python/FastAPI)            │
│                 http://localhost:8000                │
│  scikit-learn (Random Forest + KNN)                  │
│  Endpoints: /predict/skills · /predict/schemes       │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Features

| Feature | Description |
|---|---|
| 🏠 Dashboard | Personalized home with progress tracking |
| 🏛️ Government Schemes | ML-recommended + searchable catalogue (25 schemes) |
| 📚 Skill Recommendations | Random Forest classifier for skill matching |
| 📝 Readiness Quiz | 3-step quiz → ML-powered skill suggestions |
| 👩‍🏫 Mentorship | Browse mentors, send messages |
| 🛍️ Marketplace | List and browse handmade products |
| 💼 Opportunities | Local job listings with match scores |
| 🛡️ Safety & Legal | Emergency SOS, helplines, know your rights |
| 📊 Impact Dashboard | Community statistics and goal tracking |
| 👤 Profile | Account details, saved items, logout |
| 🌐 Multi-language | English, Hindi, Marathi |

---

## 🤖 Machine Learning Models

### 1. Skill Recommendation (Random Forest Classifier)
- **Algorithm**: `RandomForestClassifier` (100 estimators)
- **Input**: Interest area, time availability, career goal
- **Output**: Top 3 skills with match percentage + duration
- **Training Data**: 65 curated samples across 4 interest categories
- **File**: `ml-service/train_skills.py`

### 2. Scheme Recommendation (K-Nearest Neighbors)
- **Algorithm**: `NearestNeighbors` (k=5, Euclidean distance)
- **Input**: Age, income, employment status, state
- **Output**: Top 5 matching government schemes with eligibility scores
- **Training Data**: 25 real Indian government schemes
- **File**: `ml-service/train_schemes.py`

---

## 📱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, Framer Motion |
| Backend | Node.js 22, Express 5, Mongoose 9 |
| Database | MongoDB |
| ML Service | Python 3, FastAPI, scikit-learn, joblib |
| Auth | JWT (jsonwebtoken) + bcryptjs |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB (local or Atlas)

### 1. Install Dependencies

```bash
# Frontend
cd my-app && npm install

# Backend
cd backend && npm install

# ML Service
cd ml-service && pip install -r requirements.txt
```

### 2. Train ML Models (one-time)

```bash
cd ml-service
python train_skills.py
python train_schemes.py
```

### 3. Start All Services

```powershell
# Option A: Use the startup script
.\start_all.ps1

# Option B: Start individually
# Terminal 1 — ML Service
cd ml-service && python -m uvicorn main:app --port 8000 --reload

# Terminal 2 — Backend
cd backend && node index.js

# Terminal 3 — Frontend
cd my-app && npm run dev
```

### 4. Open the App
Navigate to **http://localhost:3000**

---

## 📁 Project Structure

```
CEP/
├── my-app/                   # Frontend (Next.js)
│   ├── app/
│   │   ├── page.tsx          # Welcome/Landing
│   │   ├── login/            # Login screen
│   │   ├── register/         # Registration
│   │   ├── home/             # Dashboard
│   │   ├── schemes/          # Government schemes
│   │   ├── skills/           # Skill recommendations
│   │   │   └── readiness/    # Readiness quiz
│   │   ├── mentors/          # Mentor directory
│   │   ├── products/         # Product marketplace
│   │   ├── opportunities/    # Local job listings
│   │   ├── safety/           # Safety & legal
│   │   ├── impact/           # Impact dashboard
│   │   ├── profile/          # User profile
│   │   ├── components/       # Reusable UI components
│   │   └── context/          # AuthContext, LanguageContext
│   └── .env.local
│
├── backend/                  # Backend (Express + MongoDB)
│   ├── index.js              # Server entry point
│   ├── src/
│   │   ├── config/db.js      # MongoDB connection
│   │   ├── middleware/auth.js # JWT middleware
│   │   ├── models/           # User, Scheme, Product, Mentor, Opportunity
│   │   └── routes/           # auth.js, content.js, ml.js
│   └── .env
│
├── ml-service/               # ML Service (FastAPI + scikit-learn)
│   ├── main.py               # FastAPI server
│   ├── train_skills.py       # Random Forest training
│   ├── train_schemes.py      # KNN training
│   ├── data/                 # CSV datasets
│   ├── models/               # Trained .pkl files
│   └── requirements.txt
│
├── start_all.ps1             # Start all 3 services
└── README.md
```

---

## 📌 API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login with phone + password |
| GET | `/me` | Get current user (protected) |

### Content (`/api/content`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/schemes` | Get all government schemes |
| GET | `/mentors` | Get all mentors |
| GET | `/products` | Get all products |
| POST | `/products` | Add a new product |
| GET | `/opportunities` | Get local job listings |
| GET | `/impact` | Get impact statistics |

### ML (`/api/ml`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/predict-skills` | Predict skills (Random Forest) |
| POST | `/predict-schemes` | Predict schemes (KNN) |
| POST | `/quiz` | Score readiness quiz + ML predict |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary (Pink) | `#E91E63` |
| Secondary (Purple) | `#9C27B0` |
| Background | `#F8F9FB` |
| Accent (Yellow) | `#FFC107` |
| Font | Poppins (Google Fonts) |
| Border Radius | 2xl–3xl |
| Shadows | Soft, brand-colored |

---

## 👩‍💻 Team

Built for the Community Engagement Project (CEP).

---
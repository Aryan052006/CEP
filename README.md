Build a modern, mobile-first, full-stack web application for women empowerment, targeting rural and semi-urban users in India.

The application must include:
• Frontend (React + Tailwind CSS)
• Backend (FastAPI or Node.js)
• Database (MongoDB / Firebase / PostgreSQL)
• Real Machine Learning models (scikit-learn)
• Multi-language support (English, Hindi, Marathi)

The app should feel like a real startup product with smooth UI and simple usability.

🎯 CORE OBJECTIVE

Help women:
• Discover government schemes
• Learn income-generating skills
• Connect with mentors
• Showcase products
• Achieve financial independence

🌍 MULTI-LANGUAGE SUPPORT

• Languages: English, Hindi, Marathi
• Add 🌐 language switcher in navbar
• Store selected language in local storage
• All text must be dynamic and translatable

📱 USER FLOW

1️⃣ Welcome Page
• Tagline: “Empowering Women Through Skills & Opportunities”
• Buttons: Register, Login

2️⃣ Registration Page
Fields:
• Name, Age, Income, Employment, Location
→ Save in database

3️⃣ Home Dashboard
• Greeting + banner
• Feature cards
• Bottom navigation

🧠 FEATURES

• Scheme Recommendation
• Skill Recommendation
• Skill Readiness Test
• Mentorship
• Local Opportunities
• Product Showcase
• Safety & Legal Help
• Impact Dashboard
• Profile Page

🇮🇳 GOVERNMENT SCHEMES (FIXED LIST)

Use ONLY these 12 schemes:

• Beti Bachao Beti Padhao
• STEP
• Working Women Hostel
• Mahila E-Haat
• Pradhan Mantri Mudra Yojana
• Stand Up India
• PMEGP
• Deendayal Antyodaya Yojana (NRLM)
• PMKVY
• Skill India
• PMGDISHA
• DDU-GKY

Each scheme must include:
• Name
• Benefits
• Eligibility
• Official link (very important)

🔗 SCHEME REDIRECTION FEATURE (VERY IMPORTANT ⭐)

• Each scheme card must include an “Apply Now” button
• On click → redirect user to the official government website
• Open link in a new tab (for better user experience)
• Show a small note: “Opens official government site”
• Add external link icon for clarity

This ensures real-world usability and authenticity.

🗄 DATABASE

Tables/Collections:
• Users
• Schemes
• Skills
• Mentors
• Products
• Opportunities

Store:
• User profile
• Preferences
• ML predictions
• Progress

Each scheme in database must include:
• name
• category
• eligibility
• benefits
• official_link

⚙️ BACKEND APIs

• POST /register
• POST /login
• GET /user
• GET /schemes
• POST /skill-recommendation
• POST /quiz
• GET /mentors
• POST /product
• GET /opportunities

🧠 MACHINE LEARNING (REAL)

Dataset Source:
Use Adult Income Dataset from Kaggle and extend it.

Dataset Structure:
age, income, employment, location, scheme

Models:

1️⃣ Scheme Recommendation
• Algorithm: Random Forest
• Input:
Age, Income, Employment, Location
• Output:
One of 12 schemes

2️⃣ Skill Recommendation
• Based on user answers
• Classification or clustering

3️⃣ Skill Readiness Score
• Score-based or ML

Requirements:
• Train model using dataset
• Save model (.pkl)
• Load in backend
• Serve predictions via API

🔗 FRONTEND CONNECTION

• Use fetch/axios
• Replace static data with API calls
• Show loading and error states

🎨 UI DESIGN

Colors:
• Pink (#E91E63)
• Purple (#9C27B0)
• Background (#F8F9FB)
• Accent (#FFC107)

• Gradient: Pink → Purple

Style:
• Card-based UI
• Rounded corners
• Soft shadows

Fonts:
• Poppins / Inter

✨ UX FEATURES

• Smooth transitions
• Hover effects
• Toast messages
• Loading skeletons
• Bottom navigation

👩‍🏫 MENTORSHIP SYSTEM

• Real profiles:
Name, Photo, Skill, Experience, Location
• Rating + availability
• Connect + Message buttons

📊 IMPACT DASHBOARD

• Women registered
• Skills learned
• Products listed

🛍 PRODUCT SHOWCASE

• Product image, price, contact

🛡 SAFETY & LEGAL

• Helplines
• Rights info
• Emergency button
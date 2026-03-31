# Jan-Sahayak 🩺🇮🇳

### **Empowering Every Citizen with AI-Driven Health & Welfare**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Jan--Sahayak-blue?style=for-the-badge&logo=vercel)](https://jan-sahayak-six.vercel.app/)
[![GitHub](https://img.shields.io/badge/Source_Code-GitHub-black?style=for-the-badge&logo=github)](https://github.com/anshul-24/Jan-Sahayak)

> **Developed for the Hack Heist Hackathon** 🏆

Jan-Sahayak is a cutting-edge, full-stack AI health assistant designed specifically for the Indian context. It bridges the critical gap between complex medical data, government welfare, and the common citizen. By combining **Google Gemini 2.0**, **ElevenLabs Conversational AI**, and a robust **FastAPI/Supabase** backend, Jan-Sahayak provides a seamless, multilingual, and highly accessible healthcare experience.

---

## ✨ Key Features

### 🏥 **AI Medical Report Analysis**
Upload any medical report (Blood tests, MRI, X-rays) and get a jargon-free, simplified explanation in seconds. Powered by **Gemini 2.0 Flash**, it identifies key parameters, flags abnormalities, and provides actionable health summaries.

### 🎙️ **Multilingual Voice AI Agent**
A real-time, low-latency conversational agent that speaks both **English and Hindi**. Built with **ElevenLabs**, it can answer health queries, explain your stored reports, and even suggest government schemes through natural voice interaction.

### 📜 **Smart Scheme Recommender**
An intelligent engine that matches users with eligible government health and welfare schemes based on their demographics, health conditions, and location. No more digging through complex government portals.

### 🔒 **Secure Medical Vault**
A centralized, secure repository for all your medical records. Uploaded reports are stored in **Supabase Storage** with metadata persisted in PostgreSQL, ensuring your health history is always at your fingertips.

### 🩺 **AI Symptom Checker & Diagnosis**
Input your symptoms and receive preliminary guidance. It helps users understand the potential severity of their condition and suggests the next logical steps (like "Consult a GP" or "Visit ER").

### 🚑 **Healthcare Locator**
Integrated maps and directories to help users find the nearest hospitals, specialized doctors, and 24/7 pharmacies in their vicinity.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Lucide Icons, Custom Premium CSS (Glassmorphism) |
| **Backend** | Python 3.x, FastAPI, Uvicorn |
| **Database & Storage** | Supabase (PostgreSQL, Blob Storage) |
| **Authentication** | Firebase Auth (Google OAuth) |
| **AI / ML** | Google Gemini 2.0 Flash (Vision/Text), ElevenLabs Conversational AI |
| **Deployment** | Vercel (Frontend), Railway/Render (Backend) |

---

## 📂 Project Structure

```text
Jan-Sahayak/
├── frontend/               # React (Vite) Single Page Application
│   ├── src/
│   │   ├── components/     # UI Pages (MedReport, VoicePage, Schemes, etc.)
│   │   ├── context/        # Global State (AppContext)
│   │   ├── lib/            # Firebase & API configurations
│   │   └── assets/         # Static media and icons
│   └── package.json        
├── backend/                # FastAPI (Python) REST API
│   ├── routes/             # API Endpoints (Reports, Schemes, Agent)
│   ├── services/           # AI & Logic (Gemini Analyzer, Scheme Matcher)
│   ├── database.py         # Supabase Client
│   └── requirements.txt    
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Python (3.9+)
- API Keys: Google Gemini, ElevenLabs, Firebase, Supabase

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env  # Add your API keys here
npm run dev
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Add your Supabase & AI keys
uvicorn main:app --reload
```

---

## 📡 API Endpoints (Quick Look)

- `GET /api/reports` - Fetch user's medical history.
- `POST /api/reports/upload` - Upload and analyze a new medical report.
- `POST /api/schemes/match` - Get eligible schemes based on health profile.
- `POST /api/agent/tool` - Webhook for ElevenLabs agent to fetch data.

---

## 👥 The Team

- **Anshul**
- **Harsh Raj**

---

## 🤝 Contributing

This project was built in a **36-hour hackathon environment**. We welcome contributions to improve the AI models, add more Indian languages, or integrate deeper with government APIs.

---

_Built with ❤️ for a Healthier India._

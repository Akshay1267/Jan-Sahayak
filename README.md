# Jan-Sahayak 🩺🇮🇳

[![Live Demo](https://img.shields.io/badge/Live_Demo-Jan--Sahayak-blue?style=for-the-badge)](https://jan-sahayak-six.vercel.app/)

> **Developed for the Hack Heist Hackathon**

Jan-Sahayak is a full-stack, AI-powered citizen health and welfare assistant designed to provide accessible healthcare guidance and scheme recommendations for Indian citizens. Built over a 36-hour hackathon, this platform aims to bridge the gap between complex medical information, government welfare programs, and the general public through an intuitive, multilingual, and premium user interface.

## 🌟 Key Features

The application is structured as a robust Single Page Application (SPA) offering a suite of AI-driven capabilities:

1. **🏥 Medical Report Analysis (`MedReportPage`)**: Upload medical reports to receive simplified, jargon-free explanations and actionable summaries powered by AI.
2. **📜 Health Scheme Recommender (`SchemesPage`)**: A smart engine that suggests eligible government health and welfare schemes tailored to the user's demographic and needs.
3. **🩺 Symptom Checker & Diagnosis (`DiagnosisPage`)**: Input symptoms to receive preliminary AI-driven health guidance and potential next steps.
4. **🎙️ Multilingual Voice Agent (`VoicePage`)**: Speak to the platform to get instant healthcare answers, making the app highly accessible for users with varying digital literacy levels.
5. **🔒 Medical Records Vault (`VaultPage`)**: Securely upload and store your medical records (prescriptions, test results) in one centralized location.
6. **🚑 Locate Hospitals & Doctors (`HospitalsPage`, `DoctorsPage`)**: Find nearby healthcare facilities and available medical professionals seamlessly.
7. **🌿 Home Remedies (`RemediesPage`)**: Access a curated repository of traditional, safe, and effective home remedies for minor ailments.
8. **📷 Camera Integration (`CameraPage`)**: Instantly capture and scan prescriptions or medical documents for quick processing.

## 📂 Folder Structure

```text
jan-sahayak/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and local data files
│   ├── components/         # React components (Pages & UI elements)
│   │   ├── BottomNav.jsx
│   │   ├── CameraPage.jsx
│   │   ├── DiagnosisPage.jsx
│   │   ├── DoctorsPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── HospitalsPage.jsx
│   │   ├── MedReportPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── RemediesPage.jsx
│   │   ├── SchemesPage.jsx
│   │   ├── SponsorBanner.jsx
│   │   ├── VaultPage.jsx
│   │   └── VoicePage.jsx
│   ├── context/            # React Context API
│   │   └── AppContext.jsx
│   ├── data/               # Local JSON/Data files
│   ├── App.jsx             # Main App component router
│   ├── index.css           # Global CSS styles
│   └── main.jsx            # Entry point
├── .env.backup             # Environment variable template
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite framework configuration
```

## 🛠️ Technology Stack

- **Frontend Core**: React 19.x with Vite for blazing-fast development and build times.
- **Styling**: Custom CSS focused on a premium, emotion-driven, and highly accessible aesthetic.
- **AI Integration**: `@google/generative-ai` (Google Gemini) for powering the report analysis, symptom checking, and voice capabilities.
- **Icons**: `lucide-react` for beautiful, consistent iconography.
- **State Management**: React Context API (`AppContext`) for global state and toast notifications.

## 🚀 Getting Started

To get the project up and running locally:

### 1. Prerequisites
Ensure you have Node.js and npm installed on your system.

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory (you can use `.env.backup` as a reference if available) and add your API keys:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 👥 Team

- **Anshul**
- **Harsh Raj**

## 🤝 Contributing

This project was built dynamically during the **Hack Heist Hackathon**. Feel free to fork the repository, open issues, and submit pull requests if you want to expand the platform's vision!

---
*Built with ❤️ to empower every citizen.*

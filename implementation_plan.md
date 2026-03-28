# Jan-Sahayak: Voice AI Agent with Report Storage & Scheme Recommendations

## Overview

Add a **Python FastAPI backend** with **Supabase** (PostgreSQL + file storage) to persist user-uploaded medical reports, and upgrade the voice agent to use **ElevenLabs Conversational AI** for real-time voice interaction. The agent will have access to the user's stored reports and the government schemes database, enabling it to answer medical questions and recommend applicable schemes — all via voice.

## Current State

- **Frontend**: React + Vite SPA in `frontend/` — has [MedReportPage](file:///d:/Jan-Sahayak/frontend/src/components/MedReportPage.jsx#6-171) (Gemini Vision analysis), [VoicePage](file:///d:/Jan-Sahayak/frontend/src/components/VoicePage.jsx#6-176) (Web Speech API + ElevenLabs TTS), `SchemesPage`, `VaultPage` (localStorage only)
- **Backend**: None — all logic runs client-side with API keys in env vars
- **Database**: None — medical vault saved to `localStorage`
- **Voice**: [VoicePage.jsx](file:///d:/Jan-Sahayak/frontend/src/components/VoicePage.jsx) uses browser Speech Recognition → Gemini text completion → ElevenLabs TTS (one-shot, not conversational)

> [!IMPORTANT]
> This plan requires the user to have:
> 1. An **ElevenLabs API key** (for Conversational AI agent)
> 2. A **Supabase project** (free tier works — [supabase.com](https://supabase.com))
> 3. A **Google Gemini API key** (already present)

---

## Proposed Changes

### Backend (FastAPI + Supabase)

#### [NEW] [backend/requirements.txt](file:///d:/Jan-Sahayak/backend/requirements.txt)
Dependencies: `fastapi`, `uvicorn`, `supabase`, `python-dotenv`, `google-generativeai`, `python-multipart`

#### [NEW] [backend/.env.example](file:///d:/Jan-Sahayak/backend/.env.example)
Template with keys: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `GEMINI_API_KEY`, `ELEVENLABS_API_KEY`

#### [NEW] [backend/main.py](file:///d:/Jan-Sahayak/backend/main.py)
FastAPI app entry point with CORS middleware and router registration.

#### [NEW] [backend/config.py](file:///d:/Jan-Sahayak/backend/config.py)
Loads environment variables (Supabase URL/key, Gemini key, ElevenLabs key).

#### [NEW] [backend/database.py](file:///d:/Jan-Sahayak/backend/database.py)
Supabase client initialization + helper functions for DB and storage operations.

#### [NEW] [backend/routes/reports.py](file:///d:/Jan-Sahayak/backend/routes/reports.py)
API routes for medical reports:
- `POST /api/reports/upload` — Upload report image → store in Supabase Storage → save metadata to `reports` table
- `POST /api/reports/{id}/analyze` — Send stored report image to Gemini Vision → save analysis JSON to DB
- `GET /api/reports` — List all reports for a user (with analysis data)
- `GET /api/reports/{id}` — Get single report with full analysis

#### [NEW] [backend/routes/schemes.py](file:///d:/Jan-Sahayak/backend/routes/schemes.py)
API routes for scheme matching:
- `POST /api/schemes/match` — Accept health flags, user profile → return matching schemes (used by ElevenLabs agent tool)
- `GET /api/schemes` — List all schemes

#### [NEW] [backend/routes/agent.py](file:///d:/Jan-Sahayak/backend/routes/agent.py)
Webhook endpoint for ElevenLabs Conversational AI custom tools:
- `POST /api/agent/tool` — ElevenLabs calls this with tool name + parameters → backend executes (fetch reports, match schemes, analyze report context) → returns result to agent

#### [NEW] [backend/services/analyzer.py](file:///d:/Jan-Sahayak/backend/services/analyzer.py)
Gemini Vision integration — takes image data, runs analysis prompt, returns structured JSON.

#### [NEW] [backend/services/scheme_matcher.py](file:///d:/Jan-Sahayak/backend/services/scheme_matcher.py)
Scheme matching logic — filters schemes based on health flags, user demographics, state, occupation.
Migrated from frontend [schemes.js](file:///d:/Jan-Sahayak/frontend/src/data/schemes.js) data into Python.

### Database Schema (Supabase)

```sql
-- Reports table
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default',
  image_url TEXT NOT NULL,
  file_name TEXT,
  extracted_text TEXT,
  analysis JSONB,
  health_flags TEXT[],
  urgency TEXT DEFAULT 'normal',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations table (for audit/history)
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default',
  report_id UUID REFERENCES reports(id),
  transcript TEXT,
  agent_response TEXT,
  schemes_suggested TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

> [!NOTE]
> For the hackathon MVP, `user_id` defaults to `'default'`. Full auth can be added later with Supabase Auth.

---

### Frontend Updates

#### [MODIFY] [VoicePage.jsx](file:///d:/Jan-Sahayak/frontend/src/components/VoicePage.jsx)
Replace the current manual Speech Recognition + Gemini + ElevenLabs TTS pipeline with the **ElevenLabs Conversational AI SDK** (`@11labs/react`):
- Embed `<Conversation>` widget that handles mic input, turn-taking, and voice output automatically
- Agent will have access to report context and scheme matching via backend webhook tools
- Keep language selector (Hindi / English) — configure agent's voice accordingly

#### [MODIFY] [MedReportPage.jsx](file:///d:/Jan-Sahayak/frontend/src/components/MedReportPage.jsx)
- After successful analysis, send report image + analysis to backend `POST /api/reports/upload` → persist to Supabase
- "Save to Vault" button now saves to both localStorage (existing) AND backend DB
- Add a "View Past Reports" section that fetches from backend `GET /api/reports`

#### [MODIFY] [AppContext.jsx](file:///d:/Jan-Sahayak/frontend/src/context/AppContext.jsx)
- Add `VITE_BACKEND_URL` env variable for API base URL
- Add helper functions: `uploadReport()`, `fetchReports()` that call the backend

#### [MODIFY] [package.json](file:///d:/Jan-Sahayak/frontend/package.json)
Add dependency: `@11labs/react` for ElevenLabs Conversational AI integration.

---

### ElevenLabs Conversational AI Setup

The ElevenLabs agent will be configured with:

1. **System Prompt**: "You are JanSahayak, a caring AI health assistant for Indian citizens. You analyze medical reports, answer health questions in simple language, and recommend government welfare schemes."

2. **Custom Tools** (call backend webhooks):
   - `get_user_reports` → fetches user's stored reports + analysis from Supabase
   - `match_schemes` → sends health flags + user demographics to backend → returns matching schemes
   - `analyze_report_context` → provides detailed report context for the ongoing conversation

3. **Voice**: Hindi voice (`pFZP5JQG7iQjIQuC4Bku`) and English voice (`21m00Tcm4TlvDq8ikWAM`) — switchable by user

---

## Architecture Diagram

```
┌───────────────────────────────────────────┐
│  React + Vite Frontend (frontend/)        │
│  ├── VoicePage → ElevenLabs Conv. AI SDK  │
│  ├── MedReportPage → Upload to backend    │
│  └── Report History → Fetch from backend  │
└──────────────────┬────────────────────────┘
                   │ REST API
┌──────────────────▼────────────────────────┐
│  Python FastAPI Backend (backend/)        │
│  ├── POST /api/reports/upload             │
│  ├── POST /api/reports/{id}/analyze       │
│  ├── GET  /api/reports                    │
│  ├── POST /api/schemes/match              │
│  └── POST /api/agent/tool  ← ElevenLabs  │
└────┬───────────┬──────────────┬───────────┘
     │           │              │
     ▼           ▼              ▼
  Supabase    Gemini       ElevenLabs
  DB+Storage  Vision       Conv. AI
```

---

## Verification Plan

### Manual Testing (Step-by-Step)

Since this is a full-stack integration with external APIs (Supabase, ElevenLabs, Gemini), manual testing is the most practical approach:

**1. Backend API Test:**
```bash
cd d:\Jan-Sahayak\backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
- Open `http://localhost:8000/docs` (FastAPI Swagger UI)
- Test `POST /api/reports/upload` with a sample medical report image
- Verify the report appears in Supabase dashboard (Storage + DB row)
- Test `GET /api/reports` and confirm the uploaded report is returned
- Test `POST /api/schemes/match` with sample health flags → verify scheme list

**2. Frontend Integration Test:**
```bash
cd d:\Jan-Sahayak\frontend
npm install
npm run dev
```
- Open MedReport page → upload a medical report → click "Analyze"
- Verify analysis results display correctly
- Click "Save to Vault" → verify report persists in Supabase (check DB)
- Refresh page → verify report appears in "Past Reports" section

**3. Voice Agent Test:**
- Open Voice page → select language
- Click mic → speak a health question → verify agent responds in voice
- Upload a report first → then ask the voice agent about "my latest report" → verify it references stored report context
- Ask "What schemes am I eligible for?" → verify agent recommends relevant schemes

> [!NOTE]
> Voice agent testing requires a working microphone and speakers. The ElevenLabs Conversational AI test should be run in Chrome for best compatibility with WebSocket + audio APIs.

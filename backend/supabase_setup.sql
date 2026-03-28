-- Jan-Sahayak Supabase Setup
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. Reports table
CREATE TABLE IF NOT EXISTS reports (
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

-- 2. Conversations table (audit trail)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default',
  report_id UUID REFERENCES reports(id),
  transcript TEXT,
  agent_response TEXT,
  schemes_suggested TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- 4. Allow all access for now (MVP — tighten with Supabase Auth later)
CREATE POLICY "Allow all access to reports" ON reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to conversations" ON conversations FOR ALL USING (true) WITH CHECK (true);

-- 5. Create the 'reports' storage bucket (if not exists)
-- NOTE: You also need to create a storage bucket named "reports" in the Supabase Dashboard:
--   Dashboard → Storage → New Bucket → Name: "reports" → Public: ON

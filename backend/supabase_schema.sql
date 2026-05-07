-- AttenMate: Supabase Database Schema
-- Run this in the Supabase SQL Editor to set up your cloud database.

-- 1. Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
  id BIGINT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  attended INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Attendance Logs Table
CREATE TABLE IF NOT EXISTS attendance_logs (
  id BIGINT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subjectId BIGINT REFERENCES subjects(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 3. Settings Table
CREATE TABLE IF NOT EXISTS settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  dailyReminderEnabled BOOLEAN DEFAULT true,
  examDate TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- 5. Policies (Private Data Access)

-- Subjects: Users can only see/edit their own data
CREATE POLICY "Users can manage their own subjects" 
ON subjects FOR ALL 
USING (auth.uid() = user_id);

-- Logs: Users can only see/edit their own logs
CREATE POLICY "Users can manage their own logs" 
ON attendance_logs FOR ALL 
USING (auth.uid() = user_id);

-- Settings: Users can only see/edit their own settings
CREATE POLICY "Users can manage their own settings" 
ON settings FOR ALL 
USING (auth.uid() = user_id);

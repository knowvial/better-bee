-- Supabase Database Schema for Single-User Spell Bee App
-- Run these commands in the Supabase SQL Editor

-- 1. Practice Sessions Table
CREATE TABLE practice_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT DEFAULT 'single-user',
  mode TEXT NOT NULL, -- 'smart', 'competition', 'review'
  words_practiced INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  accuracy FLOAT DEFAULT 0,
  duration_minutes INTEGER DEFAULT 0,
  session_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Word Progress Table
CREATE TABLE word_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT DEFAULT 'single-user',
  word TEXT NOT NULL,
  attempts INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new', -- 'new', 'learning', 'mastered', 'failed'
  last_attempt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint for user_id + word combination
  UNIQUE(user_id, word)
);

-- 3. Mistakes Log Table
CREATE TABLE mistakes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT DEFAULT 'single-user',
  session_id UUID REFERENCES practice_sessions(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  incorrect_spelling TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
CREATE INDEX idx_word_progress_user_word ON word_progress(user_id, word);
CREATE INDEX idx_practice_sessions_user_date ON practice_sessions(user_id, session_date);
CREATE INDEX idx_mistakes_user_word ON mistakes(user_id, word);

-- 5. Enable Row Level Security (optional but recommended)
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE mistakes ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for anonymous access (single user)
-- Allow all operations for the single user
CREATE POLICY "Allow single user access" ON practice_sessions
  FOR ALL 
  USING (user_id = 'single-user')
  WITH CHECK (user_id = 'single-user');

CREATE POLICY "Allow single user access" ON word_progress
  FOR ALL 
  USING (user_id = 'single-user')
  WITH CHECK (user_id = 'single-user');

CREATE POLICY "Allow single user access" ON mistakes
  FOR ALL 
  USING (user_id = 'single-user')
  WITH CHECK (user_id = 'single-user');

-- 7. Sample queries to test (optional)
-- View recent sessions
-- SELECT * FROM practice_sessions ORDER BY session_date DESC LIMIT 10;

-- View word progress stats
-- SELECT 
--   status,
--   COUNT(*) as word_count,
--   AVG(correct_count::float / NULLIF(attempts, 0) * 100) as avg_accuracy
-- FROM word_progress 
-- WHERE attempts > 0
-- GROUP BY status;

-- View most difficult words
-- SELECT word, attempts, correct_count, 
--        ROUND((correct_count::float / NULLIF(attempts, 0) * 100), 1) as accuracy_percent
-- FROM word_progress 
-- WHERE attempts >= 3
-- ORDER BY accuracy_percent ASC, attempts DESC
-- LIMIT 20;
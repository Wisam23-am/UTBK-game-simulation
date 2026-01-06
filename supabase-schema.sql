-- ============================================
-- UTBK GAME SIMULATION - DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USER PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  avatar_url TEXT,
  school VARCHAR(100),
  target_university VARCHAR(100),
  total_games INTEGER DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 2. QUESTIONS BANK TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(50) NOT NULL,
    -- UTBK Categories: 'pu', 'pk', 'ppu', 'pbm', 'lbi', 'lbe', 'pm'
    -- Legacy: 'matematika', 'bahasa-indonesia', 'bahasa-inggris', 'tps'
  subcategory VARCHAR(100),
  difficulty VARCHAR(20) NOT NULL, -- 'easy', 'medium', 'hard'
  difficulty_weight INTEGER DEFAULT 10, -- easy=8, medium=10, hard=12
  utbk_section VARCHAR(50),
    -- 'penalaran-umum', 'pengetahuan-kuantitatif', 'pemahaman-bacaan-menulis',
    -- 'pengetahuan-pemahaman-umum', 'literasi-bahasa-indonesia', 
    -- 'literasi-bahasa-inggris', 'penalaran-matematika'
  question TEXT NOT NULL,
  question_image_url TEXT, -- URL for question diagrams/images
  options JSONB NOT NULL,
    -- [{"label": "A", "text": "..."}, {"label": "B", "text": "..."}, ...]
  correct_answer VARCHAR(1) NOT NULL,
  explanation TEXT,
  stimulus_id UUID, -- FK to question_stimulus for shared passages
  source VARCHAR(30) DEFAULT 'curated',
    -- 'curated', 'ai-generated', 'utbk-2024', 'utbk-2023', 'pdf-utbk-2024'
  year INTEGER,
  verified BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  correct_rate FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 3. GAME RESULTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS game_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  wrong_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_spent INTEGER, -- in seconds
  category VARCHAR(50),
  difficulty VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 3B. QUESTION STIMULUS TABLE (for shared passages)
-- ============================================
CREATE TABLE IF NOT EXISTS question_stimulus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200), -- 'Bacaan 1: Perubahan Iklim Global'
  content TEXT NOT NULL, -- Long passage text
  image_url TEXT, -- Optional stimulus image
  stimulus_type VARCHAR(30), -- 'text', 'chart', 'table', 'mixed'
  section VARCHAR(50), -- UTBK section this stimulus belongs to
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 3C. ADD MISSING COLUMNS TO QUESTIONS TABLE
-- ============================================
-- Add columns if they don't exist (for existing databases)
ALTER TABLE questions ADD COLUMN IF NOT EXISTS difficulty_weight INTEGER DEFAULT 10;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS utbk_section VARCHAR(50);
ALTER TABLE questions ADD COLUMN IF NOT EXISTS question_image_url TEXT;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS stimulus_id UUID;

-- ============================================
-- 3D. ADD FOREIGN KEY CONSTRAINTS
-- ============================================
-- Add foreign key constraint for stimulus (after both column and table exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_stimulus' 
    AND table_name = 'questions'
  ) THEN
    ALTER TABLE questions 
    ADD CONSTRAINT fk_stimulus 
    FOREIGN KEY (stimulus_id) REFERENCES question_stimulus(id) ON DELETE SET NULL;
  END IF;
END $$;

-- ============================================
-- 3E. UPDATE EXISTING DATA
-- ============================================
-- Set difficulty_weight for existing questions based on difficulty
UPDATE questions 
SET difficulty_weight = CASE 
  WHEN difficulty = 'easy' THEN 8
  WHEN difficulty = 'medium' THEN 10
  WHEN difficulty = 'hard' THEN 12
  ELSE 10
END
WHERE difficulty_weight IS NULL OR difficulty_weight = 10;

-- ============================================
-- 4. INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_game_results_user ON game_results(user_id);
CREATE INDEX IF NOT EXISTS idx_game_results_score ON game_results(score DESC);
CREATE INDEX IF NOT EXISTS idx_game_results_created ON game_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category, difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_verified ON questions(verified) WHERE verified = true;
CREATE INDEX IF NOT EXISTS idx_questions_section ON questions(utbk_section);
CREATE INDEX IF NOT EXISTS idx_questions_category_section ON questions(category, utbk_section);
CREATE INDEX IF NOT EXISTS idx_questions_stimulus ON questions(stimulus_id) WHERE stimulus_id IS NOT NULL;

-- ============================================
-- 5. GLOBAL LEADERBOARD (Materialized View)
-- ============================================
DROP MATERIALIZED VIEW IF EXISTS global_leaderboard CASCADE;

CREATE MATERIALIZED VIEW global_leaderboard AS
SELECT
  p.id,
  p.username,
  p.full_name,
  p.avatar_url,
  p.school,
  p.target_university,
  MAX(gr.score) as best_score,
  COUNT(gr.id) as total_games,
  AVG(gr.score)::INTEGER as avg_score,
  SUM(gr.correct_answers) as total_correct,
  MIN(CASE WHEN gr.score = (SELECT MAX(score) FROM game_results WHERE user_id = p.id) 
    THEN gr.time_spent ELSE NULL END) as best_time,
  RANK() OVER (
    ORDER BY 
      MAX(gr.score) DESC,                    -- 1. Skor tertinggi (primary)
      SUM(gr.correct_answers) DESC,          -- 2. Jumlah soal benar (secondary)
      MIN(CASE WHEN gr.score = (SELECT MAX(score) FROM game_results WHERE user_id = p.id) 
        THEN gr.time_spent ELSE NULL END) ASC  -- 3. Waktu tercepat (tertiary)
  ) as rank
FROM profiles p
LEFT JOIN game_results gr ON p.id = gr.user_id
GROUP BY p.id, p.username, p.full_name, p.avatar_url, p.school, p.target_university
HAVING COUNT(gr.id) > 0
ORDER BY 
  best_score DESC, 
  total_correct DESC,
  best_time ASC
LIMIT 50;

-- Create unique index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_global_leaderboard_id ON global_leaderboard(id);

-- ============================================
-- 6. FUNCTION TO REFRESH LEADERBOARD
-- ============================================
CREATE OR REPLACE FUNCTION refresh_leaderboard()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY global_leaderboard;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-refresh leaderboard after game results insert
DROP TRIGGER IF EXISTS trigger_refresh_leaderboard ON game_results;
CREATE TRIGGER trigger_refresh_leaderboard
AFTER INSERT OR UPDATE OR DELETE ON game_results
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_leaderboard();

-- ============================================
-- 7. FUNCTION TO UPDATE PROFILE STATS
-- ============================================
CREATE OR REPLACE FUNCTION update_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET
    total_games = (SELECT COUNT(*) FROM game_results WHERE user_id = NEW.user_id),
    best_score = (SELECT MAX(score) FROM game_results WHERE user_id = NEW.user_id),
    updated_at = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update profile stats
DROP TRIGGER IF EXISTS trigger_update_profile_stats ON game_results;
CREATE TRIGGER trigger_update_profile_stats
AFTER INSERT ON game_results
FOR EACH ROW
EXECUTE FUNCTION update_profile_stats();

-- ============================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Profiles viewable by everyone" ON profiles;
CREATE POLICY "Profiles viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Game results policies
DROP POLICY IF EXISTS "Game results viewable by everyone" ON game_results;
CREATE POLICY "Game results viewable by everyone"
  ON game_results FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert own game results" ON game_results;
CREATE POLICY "Users can insert own game results"
  ON game_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Questions policies
DROP POLICY IF EXISTS "Verified questions viewable by everyone" ON questions;
CREATE POLICY "Verified questions viewable by everyone"
  ON questions FOR SELECT
  USING (verified = true);

-- Question Stimulus policies
ALTER TABLE question_stimulus ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Stimulus viewable by everyone" ON question_stimulus;
CREATE POLICY "Stimulus viewable by everyone"
  ON question_stimulus FOR SELECT
  USING (true);

-- ============================================
-- 9. SEED DATA - SAMPLE QUESTIONS
-- ============================================
-- Sample questions removed - using existing database questions

-- ============================================
-- VERIFICATION
-- ============================================

-- Show table counts
SELECT 'profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'questions', COUNT(*) FROM questions
UNION ALL
SELECT 'game_results', COUNT(*) FROM game_results;

-- Show sample questions
SELECT id, category, difficulty, LEFT(question, 50) as question_preview, verified
FROM questions
ORDER BY created_at DESC
LIMIT 5;

COMMENT ON TABLE profiles IS 'User profiles with game statistics';
COMMENT ON TABLE questions IS 'Questions bank for UTBK simulation';
COMMENT ON TABLE game_results IS 'Individual game session results';
COMMENT ON TABLE question_stimulus IS 'Shared passages/stimuli for multiple questions';
COMMENT ON MATERIALIZED VIEW global_leaderboard IS 'Top 100 players ranked by best score';

-- ============================================
-- CATEGORY MAPPING REFERENCE
-- ============================================
/*
UTBK 2024+ CATEGORY STRUCTURE:

1. TPS (Tes Potensi Skolastik):
   category | utbk_section                    | Nama Lengkap
   ---------|----------------------------------|---------------------------
   'pu'     | 'penalaran-umum'                | Penalaran Umum
   'pk'     | 'pengetahuan-kuantitatif'       | Pengetahuan Kuantitatif
   'ppu'    | 'pemahaman-bacaan-menulis'      | Pemahaman Bacaan & Menulis
   'pbm'    | 'pengetahuan-pemahaman-umum'    | Pengetahuan & Pemahaman Umum

2. LITERASI & MATEMATIKA:
   category | utbk_section                    | Nama Lengkap
   ---------|----------------------------------|---------------------------
   'lbi'    | 'literasi-bahasa-indonesia'     | Literasi Bahasa Indonesia
   'lbe'    | 'literasi-bahasa-inggris'       | Literasi Bahasa Inggris
   'pm'     | 'penalaran-matematika'          | Penalaran Matematika

3. DIFFICULTY WEIGHT:
   difficulty | difficulty_weight
   -----------|------------------
   'easy'     | 8
   'medium'   | 10
   'hard'     | 12

LEGACY CATEGORIES (Still supported):
   'matematika', 'bahasa-indonesia', 'bahasa-inggris', 'tps',
   'fisika', 'kimia', 'biologi', 'sejarah', 'geografi', 'sosiologi', 'ekonomi'
*/

-- ============================================
-- MIGRATION: Update to UTBK 2024+ Categories
-- Run this in Supabase SQL Editor to update existing database
-- ============================================

-- 1. Add new columns to questions table (if not exists)
ALTER TABLE questions ADD COLUMN IF NOT EXISTS difficulty_weight INTEGER DEFAULT 10;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS utbk_section VARCHAR(50);
ALTER TABLE questions ADD COLUMN IF NOT EXISTS question_image_url TEXT;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS stimulus_id UUID;

-- 2. Create stimulus table for shared passages
CREATE TABLE IF NOT EXISTS question_stimulus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200),
  content TEXT NOT NULL,
  image_url TEXT,
  stimulus_type VARCHAR(30), -- 'text', 'chart', 'table', 'mixed'
  section VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Add foreign key constraint (only after both tables exist)
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

-- 4. Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_questions_section ON questions(utbk_section);
CREATE INDEX IF NOT EXISTS idx_questions_category_section ON questions(category, utbk_section);
CREATE INDEX IF NOT EXISTS idx_questions_stimulus ON questions(stimulus_id) WHERE stimulus_id IS NOT NULL;

-- 5. Enable RLS for stimulus table
ALTER TABLE question_stimulus ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Stimulus viewable by everyone" ON question_stimulus;
CREATE POLICY "Stimulus viewable by everyone"
  ON question_stimulus FOR SELECT
  USING (true);

-- 6. Update existing questions with difficulty_weight
UPDATE questions 
SET difficulty_weight = CASE 
  WHEN difficulty = 'easy' THEN 8
  WHEN difficulty = 'medium' THEN 10
  WHEN difficulty = 'hard' THEN 12
  ELSE 10
END
WHERE difficulty_weight IS NULL OR difficulty_weight = 10;

-- 7. Migrate old categories to new format (OPTIONAL - uncomment if needed)
/*
-- Migrate 'matematika' to 'pm'
UPDATE questions 
SET 
  category = 'pm',
  utbk_section = 'penalaran-matematika'
WHERE category = 'matematika' AND utbk_section IS NULL;

-- Migrate 'bahasa-indonesia' to 'lbi'
UPDATE questions 
SET 
  category = 'lbi',
  utbk_section = 'literasi-bahasa-indonesia'
WHERE category = 'bahasa-indonesia' AND utbk_section IS NULL;

-- Migrate 'bahasa-inggris' to 'lbe'
UPDATE questions 
SET 
  category = 'lbe',
  utbk_section = 'literasi-bahasa-inggris'
WHERE category = 'bahasa-inggris' AND utbk_section IS NULL;

-- Migrate 'tps' to appropriate subcategory
UPDATE questions 
SET 
  category = 'pu',
  utbk_section = 'penalaran-umum'
WHERE category = 'tps' 
  AND (subcategory LIKE '%Penalaran%' OR subcategory LIKE '%Logika%')
  AND utbk_section IS NULL;
*/

-- 8. Add comments for documentation
COMMENT ON COLUMN questions.category IS 'UTBK Category: pu, pk, ppu, pbm, lbi, lbe, pm (or legacy: matematika, bahasa-indonesia, etc)';
COMMENT ON COLUMN questions.utbk_section IS 'UTBK Section: penalaran-umum, pengetahuan-kuantitatif, pemahaman-bacaan-menulis, pengetahuan-pemahaman-umum, literasi-bahasa-indonesia, literasi-bahasa-inggris, penalaran-matematika';
COMMENT ON COLUMN questions.difficulty_weight IS 'IRT-based weight: easy=8, medium=10, hard=12';
COMMENT ON COLUMN questions.question_image_url IS 'URL to question diagram/image stored in Supabase Storage';
COMMENT ON COLUMN questions.stimulus_id IS 'Foreign key to question_stimulus for shared passages/stimuli';
COMMENT ON TABLE question_stimulus IS 'Shared passages/stimuli for multiple questions (e.g., reading comprehension passages)';

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check new columns exist
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'questions'
  AND column_name IN ('difficulty_weight', 'utbk_section', 'question_image_url', 'stimulus_id')
ORDER BY ordinal_position;

-- Check question distribution by new categories
SELECT 
  category,
  utbk_section,
  difficulty,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE verified = true) as verified_count
FROM questions
GROUP BY category, utbk_section, difficulty
ORDER BY category, utbk_section, difficulty;

-- Show sample questions with new structure
SELECT 
  id,
  category,
  utbk_section,
  difficulty,
  difficulty_weight,
  LEFT(question, 50) as question_preview,
  stimulus_id IS NOT NULL as has_stimulus,
  question_image_url IS NOT NULL as has_image,
  verified
FROM questions
ORDER BY created_at DESC
LIMIT 10;

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

3. DIFFICULTY WEIGHT (for IRT scoring):
   difficulty | difficulty_weight
   -----------|------------------
   'easy'     | 8
   'medium'   | 10
   'hard'     | 12

LEGACY CATEGORIES (Still supported):
   'matematika', 'bahasa-indonesia', 'bahasa-inggris', 'tps',
   'fisika', 'kimia', 'biologi', 'sejarah', 'geografi', 'sosiologi', 'ekonomi'
*/

-- ============================================
-- MIGRATION COMPLETE! ✅
-- ============================================
-- Next steps:
-- 1. Insert new questions with category = 'pu', 'pk', etc
-- 2. Use difficulty_weight for scoring
-- 3. Link related questions via stimulus_id
-- 4. Upload images to Supabase Storage and set question_image_url

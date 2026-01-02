-- ============================================
-- MIGRATION: Update Leaderboard Ranking System
-- ============================================
-- This migration updates the global_leaderboard materialized view
-- to rank by: 1) Score (highest), 2) Correct answers (most), 3) Time (fastest)
-- 
-- Run this in Supabase SQL Editor to apply the changes

-- Drop existing materialized view
DROP MATERIALIZED VIEW IF EXISTS global_leaderboard CASCADE;

-- Recreate with new ranking logic
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
ORDER BY 
  best_score DESC, 
  total_correct DESC,
  best_time ASC
LIMIT 100;

-- Recreate unique index
CREATE UNIQUE INDEX idx_global_leaderboard_id ON global_leaderboard(id);

-- Recreate refresh function (should already exist, but recreating for safety)
CREATE OR REPLACE FUNCTION refresh_leaderboard()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY global_leaderboard;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
DROP TRIGGER IF EXISTS trigger_refresh_leaderboard ON game_results;
CREATE TRIGGER trigger_refresh_leaderboard
AFTER INSERT OR UPDATE OR DELETE ON game_results
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_leaderboard();

-- Refresh the view with new data
REFRESH MATERIALIZED VIEW CONCURRENTLY global_leaderboard;

-- ============================================
-- Verification Query
-- ============================================
-- Run this to verify the new ranking system works correctly:
-- 
-- SELECT 
--   rank,
--   username,
--   best_score,
--   total_correct,
--   best_time
-- FROM global_leaderboard
-- ORDER BY rank
-- LIMIT 20;

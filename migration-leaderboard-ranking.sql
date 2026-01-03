-- ============================================
-- MIGRATION: Update Leaderboard Ranking System v2
-- ============================================
-- This migration updates the global_leaderboard materialized view
-- Ranking: 1) Score (highest), 2) Correct answers in THAT game (most), 3) Time (fastest)
-- Display: Rank, Name, Score, Time only
-- 
-- Run this in Supabase SQL Editor to apply the changes

-- Drop existing materialized view
DROP MATERIALIZED VIEW IF EXISTS global_leaderboard CASCADE;

-- Recreate with new ranking logic
CREATE MATERIALIZED VIEW global_leaderboard AS
WITH best_games AS (
  SELECT DISTINCT ON (user_id)
    user_id,
    score,
    correct_answers,
    time_spent,
    created_at
  FROM game_results
  ORDER BY user_id, score DESC, correct_answers DESC, time_spent ASC
)
SELECT
  p.id,
  p.username,
  p.full_name,
  p.avatar_url,
  bg.score as best_score,
  bg.correct_answers as best_game_correct,
  bg.time_spent as best_time,
  COUNT(gr.id) as total_games,
  RANK() OVER (
    ORDER BY 
      bg.score DESC,              -- 1. Skor tertinggi (primary)
      bg.correct_answers DESC,    -- 2. Jumlah benar di game itu (secondary)
      bg.time_spent ASC           -- 3. Waktu tercepat (tertiary)
  ) as rank
FROM profiles p
INNER JOIN best_games bg ON p.id = bg.user_id
LEFT JOIN game_results gr ON p.id = gr.user_id
GROUP BY p.id, p.username, p.full_name, p.avatar_url, bg.score, bg.correct_answers, bg.time_spent
ORDER BY 
  bg.score DESC, 
  bg.correct_answers DESC,
  bg.time_spent ASC
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
--   best_game_correct,
--   best_time
-- FROM global_leaderboard
-- ORDER BY rank
-- LIMIT 20;
--
-- Expected columns in leaderboard:
-- - rank: Player ranking (1, 2, 3, ...)
-- - username: Player name
-- - best_score: Highest score achieved
-- - best_game_correct: Correct answers in that best game
-- - best_time: Time spent in that best game (seconds)
-- - total_games: Total games played (for reference, not displayed in UI)

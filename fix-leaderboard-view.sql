-- ============================================
-- FIX GLOBAL LEADERBOARD VIEW
-- Update to show correct answers and time from BEST game only
-- ============================================

-- Drop existing view
DROP MATERIALIZED VIEW IF EXISTS global_leaderboard CASCADE;

-- Recreate with correct logic
CREATE MATERIALIZED VIEW global_leaderboard AS
WITH best_games AS (
  SELECT DISTINCT ON (user_id)
    user_id,
    score,
    correct_answers,
    time_spent
  FROM game_results
  ORDER BY user_id, score DESC, correct_answers DESC, time_spent ASC
)
SELECT
  p.id,
  p.username,
  p.full_name,
  p.avatar_url,
  p.school,
  p.target_university,
  COALESCE(bg.score, 0) as best_score,
  p.total_games,
  COALESCE((SELECT AVG(score)::INTEGER FROM game_results WHERE user_id = p.id), 0) as avg_score,
  COALESCE(bg.correct_answers, 0) as total_correct,
  bg.time_spent as best_time,
  RANK() OVER (
    ORDER BY 
      COALESCE(bg.score, 0) DESC,
      COALESCE(bg.correct_answers, 0) DESC,
      bg.time_spent ASC NULLS LAST
  ) as rank
FROM profiles p
LEFT JOIN best_games bg ON p.id = bg.user_id
WHERE p.total_games > 0
ORDER BY 
  best_score DESC, 
  total_correct DESC,
  best_time ASC NULLS LAST
LIMIT 100;

-- Create unique index
CREATE UNIQUE INDEX idx_global_leaderboard_id ON global_leaderboard(id);

-- Refresh the view
REFRESH MATERIALIZED VIEW CONCURRENTLY global_leaderboard;

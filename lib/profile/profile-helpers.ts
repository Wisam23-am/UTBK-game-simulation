// ============================================
// Profile Helpers - User Profile & Game History
// ============================================

import { createClient } from '@/lib/supabase/client';

export interface GameHistory {
  id: string;
  score: number;
  correct_answers: number;
  wrong_answers: number;
  total_questions: number;
  time_spent: number;
  category: string;
  difficulty: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  school: string | null;
  target_university: string | null;
  total_games: number;
  best_score: number;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch user's game history with optional limit
 */
export async function fetchGameHistory(
  userId: string,
  limit: number = 10
): Promise<{
  data: GameHistory[] | null;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('game_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('❌ Error fetching game history:', error);
      return { data: null, error: new Error(error.message) };
    }

    console.log('✅ Game history fetched:', data?.length, 'games');
    return { data: data as GameHistory[], error: null };
  } catch (error) {
    console.error('❌ Exception fetching game history:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Fetch user profile with stats
 */
export async function fetchUserProfile(userId: string): Promise<{
  data: UserProfile | null;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ Error fetching user profile:', error);
      return { data: null, error: new Error(error.message) };
    }

    console.log('✅ User profile fetched:', data.username);
    return { data: data as UserProfile, error: null };
  } catch (error) {
    console.error('❌ Exception fetching user profile:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Get user statistics summary
 */
export async function fetchUserStats(userId: string): Promise<{
  data: {
    totalGames: number;
    bestScore: number;
    avgScore: number;
    totalCorrect: number;
    totalWrong: number;
    accuracy: number;
    totalTimeSpent: number;
  } | null;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    // Fetch all game results for this user
    const { data: games, error } = await supabase
      .from('game_results')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('❌ Error fetching user stats:', error);
      return { data: null, error: new Error(error.message) };
    }

    if (!games || games.length === 0) {
      return {
        data: {
          totalGames: 0,
          bestScore: 0,
          avgScore: 0,
          totalCorrect: 0,
          totalWrong: 0,
          accuracy: 0,
          totalTimeSpent: 0,
        },
        error: null,
      };
    }

    // Calculate statistics
    const totalGames = games.length;
    const bestScore = Math.max(...games.map((g) => g.score));
    const avgScore = Math.round(games.reduce((sum, g) => sum + g.score, 0) / totalGames);
    const totalCorrect = games.reduce((sum, g) => sum + g.correct_answers, 0);
    const totalWrong = games.reduce((sum, g) => sum + g.wrong_answers, 0);
    const totalQuestions = totalCorrect + totalWrong;
    const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const totalTimeSpent = games.reduce((sum, g) => sum + (g.time_spent || 0), 0);

    const stats = {
      totalGames,
      bestScore,
      avgScore,
      totalCorrect,
      totalWrong,
      accuracy,
      totalTimeSpent,
    };

    console.log('✅ User stats calculated:', stats);
    return { data: stats, error: null };
  } catch (error) {
    console.error('❌ Exception fetching user stats:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Get category performance breakdown
 */
export async function fetchCategoryPerformance(userId: string): Promise<{
  data: {
    category: string;
    gamesPlayed: number;
    avgScore: number;
    bestScore: number;
    accuracy: number;
  }[] | null;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    const { data: games, error } = await supabase
      .from('game_results')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('❌ Error fetching category performance:', error);
      return { data: null, error: new Error(error.message) };
    }

    if (!games || games.length === 0) {
      return { data: [], error: null };
    }

    // Group by category
    const categoryMap = new Map<string, GameHistory[]>();
    games.forEach((game) => {
      const category = game.category || 'unknown';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(game as GameHistory);
    });

    // Calculate stats per category
    const performance = Array.from(categoryMap.entries()).map(([category, categoryGames]) => {
      const gamesPlayed = categoryGames.length;
      const avgScore = Math.round(
        categoryGames.reduce((sum, g) => sum + g.score, 0) / gamesPlayed
      );
      const bestScore = Math.max(...categoryGames.map((g) => g.score));
      const totalCorrect = categoryGames.reduce((sum, g) => sum + g.correct_answers, 0);
      const totalQuestions = categoryGames.reduce(
        (sum, g) => sum + g.correct_answers + g.wrong_answers,
        0
      );
      const accuracy =
        totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

      return {
        category,
        gamesPlayed,
        avgScore,
        bestScore,
        accuracy,
      };
    });

    console.log('✅ Category performance fetched:', performance.length, 'categories');
    return { data: performance, error: null };
  } catch (error) {
    console.error('❌ Exception fetching category performance:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Format time spent in readable format
 */
export function formatTimeSpent(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}j ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}d`;
  } else {
    return `${secs}d`;
  }
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

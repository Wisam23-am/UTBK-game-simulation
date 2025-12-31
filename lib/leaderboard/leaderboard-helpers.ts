// ============================================
// Leaderboard Helpers - Fetch Global Leaderboard
// ============================================

import { createClient } from '@/lib/supabase/client';

export interface LeaderboardEntry {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  school: string | null;
  target_university: string | null;
  best_score: number;
  total_games: number;
  avg_score: number;
  total_correct: number;
  rank: number;
}

/**
 * Fetch global leaderboard from materialized view
 * Returns top 100 players sorted by best_score
 */
export async function fetchLeaderboard(limit: number = 100): Promise<{
  data: LeaderboardEntry[] | null;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('global_leaderboard')
      .select('*')
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('❌ Error fetching leaderboard:', error);
      return { data: null, error: new Error(error.message) };
    }

    console.log('✅ Leaderboard fetched:', data?.length, 'entries');
    return { data: data as LeaderboardEntry[], error: null };
  } catch (error) {
    console.error('❌ Exception fetching leaderboard:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Refresh the materialized view (call after game completion if needed)
 * Note: The database trigger should auto-refresh, but this is a manual option
 */
export async function refreshLeaderboard(): Promise<{
  success: boolean;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    // Use RPC to refresh materialized view
    const { error } = await supabase.rpc('refresh_global_leaderboard');

    if (error) {
      console.error('❌ Error refreshing leaderboard:', error);
      return { success: false, error: new Error(error.message) };
    }

    console.log('✅ Leaderboard refreshed successfully');
    return { success: true, error: null };
  } catch (error) {
    console.error('❌ Exception refreshing leaderboard:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Get user's rank and position in leaderboard
 */
export async function getUserRank(userId: string): Promise<{
  rank: number | null;
  entry: LeaderboardEntry | null;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('global_leaderboard')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      // User might not be in leaderboard yet (no games played)
      if (error.code === 'PGRST116') {
        return { rank: null, entry: null, error: null };
      }
      console.error('❌ Error fetching user rank:', error);
      return { rank: null, entry: null, error: new Error(error.message) };
    }

    const entry = data as LeaderboardEntry;
    console.log('✅ User rank fetched:', entry.rank);
    return { rank: entry.rank, entry, error: null };
  } catch (error) {
    console.error('❌ Exception fetching user rank:', error);
    return { rank: null, entry: null, error: error as Error };
  }
}

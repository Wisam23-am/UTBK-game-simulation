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
  best_time: number | null;
  rank: number;
}

/**
 * Fetch global leaderboard from view
 * Returns top 50 players sorted by best_score
 */
export async function fetchLeaderboard(limit: number = 50): Promise<{
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
 * Fetch leaderboard by school
 * Returns top 50 players from the same school
 */
export async function fetchLeaderboardBySchool(school: string, limit: number = 50): Promise<{
  data: LeaderboardEntry[] | null;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('global_leaderboard')
      .select('*')
      .eq('school', school)
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('❌ Error fetching school leaderboard:', error);
      return { data: null, error: new Error(error.message) };
    }

    console.log('✅ School leaderboard fetched:', data?.length, 'entries for', school);
    return { data: data as LeaderboardEntry[], error: null };
  } catch (error) {
    console.error('❌ Exception fetching school leaderboard:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Fetch leaderboard by target university
 * Returns top 50 players with the same target university
 */
export async function fetchLeaderboardByUniversity(university: string, limit: number = 50): Promise<{
  data: LeaderboardEntry[] | null;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('global_leaderboard')
      .select('*')
      .eq('target_university', university)
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('❌ Error fetching university leaderboard:', error);
      return { data: null, error: new Error(error.message) };
    }

    console.log('✅ University leaderboard fetched:', data?.length, 'entries for', university);
    return { data: data as LeaderboardEntry[], error: null };
  } catch (error) {
    console.error('❌ Exception fetching university leaderboard:', error);
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
 * Note: This checks the top 50 view first, but if user is not there,
 * it calculates their actual rank from all users
 */
export async function getUserRank(userId: string): Promise<{
  rank: number | null;
  entry: LeaderboardEntry | null;
  error: Error | null;
}> {
  try {
    const supabase = createClient();

    // First try to get from leaderboard view (top 50)
    const { data, error } = await supabase
      .from('global_leaderboard')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      const entry = data as LeaderboardEntry;
      console.log('✅ User rank fetched (in top 50):', entry.rank);
      return { rank: entry.rank, entry, error: null };
    }

    // User might not be in top 50 or haven't played yet
    if (error && error.code === 'PGRST116') {
      // Calculate rank manually for users outside top 50
      const { data: userGames } = await supabase
        .from('game_results')
        .select('score, correct_answers, time_spent')
        .eq('user_id', userId);
      
      if (!userGames || userGames.length === 0) {
        console.log('ℹ️ User has not played any games yet');
        return { rank: null, entry: null, error: null };
      }

      // Get user's best score
      const bestScore = Math.max(...userGames.map(g => g.score));
      
      // Count how many users have better score
      const { count } = await supabase
        .from('game_results')
        .select('user_id', { count: 'exact', head: true })
        .gt('score', bestScore);
      
      const calculatedRank = (count || 0) + 1;
      console.log(`✅ User rank calculated (outside top 50): #${calculatedRank}`);
      
      return { 
        rank: calculatedRank, 
        entry: null, 
        error: null 
      };
    }

    console.error('❌ Error fetching user rank:', error);
    return { rank: null, entry: null, error: new Error(error?.message || 'Unknown error') };
  } catch (error) {
    console.error('❌ Exception fetching user rank:', error);
    return { rank: null, entry: null, error: error as Error };
  }
}

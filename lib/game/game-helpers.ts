import { supabase } from '@/lib/supabase/client';

// Types
export interface Question {
  id: string;
  category: string;
  subcategory: string | null;
  difficulty: string;
  question: string;
  options: { label: string; text: string }[];
  correct_answer: string;
  explanation: string | null;
  source: string;
  verified: boolean;
  stimulus_id: string | null;
  stimulus?: {
    id: string;
    title: string;
    content: string;
  } | null;
}

export interface GameResult {
  user_id: string;
  score: number;
  correct_answers: number;
  wrong_answers: number;
  total_questions: number;
  time_spent: number;
  category?: string;
  difficulty?: string;
}

/**
 * Fetch random verified questions from Supabase
 * @param limit - Number of questions to fetch (default: 10)
 * @param category - Filter by category (optional)
 * @param difficulty - Filter by difficulty (optional)
 */
export async function fetchQuestions(
  limit: number = 10,
  category?: string,
  difficulty?: string
): Promise<{ data: Question[] | null; error: any }> {
  try {
    let query = supabase
      .from('questions')
      .select(`
        *,
        stimulus:question_stimulus(id, title, content)
      `)
      .eq('verified', true);

    if (category) {
      query = query.eq('category', category);
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    // Get random questions by ordering by random and limiting
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching questions:', error);
      return { data: null, error };
    }

    // Shuffle questions for randomness
    const shuffled = data?.sort(() => Math.random() - 0.5) || [];

    return { data: shuffled, error: null };
  } catch (error) {
    console.error('Fetch questions error:', error);
    return { data: null, error };
  }
}

/**
 * Fetch mixed questions from ALL categories for Game Mode
 * Distribution: 60% hard, 40% medium
 * Categories: pu, pk, ppu, pbm, lbi, lbe, pm (all UTBK categories)
 * 
 * @param totalQuestions - Total number of questions (default: 15)
 */
export async function fetchMixedQuestions(
  totalQuestions: number = 15
): Promise<{ data: Question[] | null; error: any }> {
  try {
    // Calculate distribution
    const hardCount = Math.ceil(totalQuestions * 0.6); // 60% hard
    const mediumCount = totalQuestions - hardCount; // 40% medium

    console.log('🎮 Fetching mixed questions:', {
      total: totalQuestions,
      hard: hardCount,
      medium: mediumCount,
      categories: 'ALL (pu, pk, ppu, pbm, lbi, lbe, pm)'
    });

    // Fetch hard questions from all categories
    const { data: hardQuestions, error: hardError } = await supabase
      .from('questions')
      .select(`
        *,
        stimulus:question_stimulus(id, title, content)
      `)
      .eq('verified', true)
      .eq('difficulty', 'hard')
      .limit(hardCount * 2); // Fetch extra for randomization

    if (hardError) {
      console.error('❌ Error fetching hard questions:', hardError);
      return { data: null, error: hardError };
    }

    // Fetch medium questions from all categories
    const { data: mediumQuestions, error: mediumError } = await supabase
      .from('questions')
      .select(`
        *,
        stimulus:question_stimulus(id, title, content)
      `)
      .eq('verified', true)
      .eq('difficulty', 'medium')
      .limit(mediumCount * 2); // Fetch extra for randomization

    if (mediumError) {
      console.error('❌ Error fetching medium questions:', mediumError);
      return { data: null, error: mediumError };
    }

    // Randomize and select exact counts
    const selectedHard = (hardQuestions || [])
      .sort(() => Math.random() - 0.5)
      .slice(0, hardCount);

    const selectedMedium = (mediumQuestions || [])
      .sort(() => Math.random() - 0.5)
      .slice(0, mediumCount);

    // Combine and shuffle all questions
    const mixedQuestions = [...selectedHard, ...selectedMedium]
      .sort(() => Math.random() - 0.5);

    console.log('✅ Mixed questions loaded:', {
      total: mixedQuestions.length,
      hard: selectedHard.length,
      medium: selectedMedium.length,
      categories: [...new Set(mixedQuestions.map(q => q.category))]
    });

    return { data: mixedQuestions, error: null };
  } catch (error) {
    console.error('❌ Fetch mixed questions error:', error);
    return { data: null, error };
  }
}

/**
 * Save game result to Supabase
 * Automatically updates profile stats via trigger
 */
export async function saveGameResult(
  result: GameResult
): Promise<{ data: any; error: any }> {
  try {
    const { data, error } = await supabase
      .from('game_results')
      .insert([result])
      .select()
      .single();

    if (error) {
      console.error('❌ Error saving game result:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return { data: null, error };
    }

    console.log('✅ Game result saved successfully:', data);
    return { data, error: null };
  } catch (error) {
    console.error('❌ Save game result exception:', error);
    return { data: null, error };
  }
}

/**
 * Get user's game history
 */
export async function getUserGameHistory(
  userId: string,
  limit: number = 10
): Promise<{ data: any[] | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('game_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching game history:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Get game history error:', error);
    return { data: null, error };
  }
}

/**
 * Get user's best score
 */
export async function getUserBestScore(
  userId: string
): Promise<{ bestScore: number; error: any }> {
  try {
    const { data, error } = await supabase
      .from('game_results')
      .select('score')
      .eq('user_id', userId)
      .order('score', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // No games played yet
      if (error.code === 'PGRST116') {
        return { bestScore: 0, error: null };
      }
      console.error('Error fetching best score:', error);
      return { bestScore: 0, error };
    }

    return { bestScore: data?.score || 0, error: null };
  } catch (error) {
    console.error('Get best score error:', error);
    return { bestScore: 0, error };
  }
}

/**
 * Update question usage stats
 */
export async function updateQuestionUsage(
  questionId: string,
  isCorrect: boolean
): Promise<void> {
  try {
    // Get current stats
    const { data: question } = await supabase
      .from('questions')
      .select('usage_count, correct_rate')
      .eq('id', questionId)
      .single();

    if (!question) return;

    const newUsageCount = (question.usage_count || 0) + 1;
    const currentCorrect = (question.correct_rate || 0) * (question.usage_count || 0);
    const newCorrectRate = (currentCorrect + (isCorrect ? 1 : 0)) / newUsageCount;

    // Update stats
    await supabase
      .from('questions')
      .update({
        usage_count: newUsageCount,
        correct_rate: newCorrectRate,
      })
      .eq('id', questionId);
  } catch (error) {
    console.error('Error updating question usage:', error);
  }
}

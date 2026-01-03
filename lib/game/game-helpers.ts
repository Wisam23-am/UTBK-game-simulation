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
 * Distribution: 
 * - PU: 3 questions (special category)
 * - Other 6 categories: 2 questions each
 * - Total: 15 questions covering all 7 UTBK categories
 * - Difficulty: 80% hard (12 questions), 20% medium (3 questions) - randomly distributed
 * 
 * Categories: pu, pk, ppu, pbm, lbi, lbe, pm
 */
export async function fetchMixedQuestions(): Promise<{ data: Question[] | null; error: any }> {
  try {
    // Define category distribution
    const categoryDistribution = [
      { category: 'pu', count: 3 },   // Penalaran Umum
      { category: 'pk', count: 2 },   // Pengetahuan Kuantitatif
      { category: 'ppu', count: 2 },  // Pengetahuan & Pemahaman Umum
      { category: 'pbm', count: 2 },  // Pemahaman Bacaan & Menulis
      { category: 'lbi', count: 2 },  // Literasi Bahasa Indonesia
      { category: 'lbe', count: 2 },  // Literasi Bahasa Inggris
      { category: 'pm', count: 2 },   // Penalaran Matematika
    ];

    console.log('🎮 Fetching balanced questions:', {
      total: 15,
      distribution: categoryDistribution.map(c => `${c.category}: ${c.count}`).join(', '),
      difficulty: '80% hard (12), 20% medium (3) - randomly distributed'
    });

    // Fetch all questions per category
    const questionsByCategory: Record<string, { hard: Question[], medium: Question[] }> = {};

    for (const { category } of categoryDistribution) {
      // Fetch hard questions for this category (all available for better randomization)
      const { data: hardQuestions, error: hardError } = await supabase
        .from('questions')
        .select(`
          *,
          stimulus:question_stimulus(id, title, content)
        `)
        .eq('verified', true)
        .eq('category', category)
        .eq('difficulty', 'hard');

      // Fetch medium questions for this category (all available for better randomization)
      const { data: mediumQuestions, error: mediumError } = await supabase
        .from('questions')
        .select(`
          *,
          stimulus:question_stimulus(id, title, content)
        `)
        .eq('verified', true)
        .eq('category', category)
        .eq('difficulty', 'medium');

      if (hardError || mediumError) {
        console.error(`❌ Error fetching ${category} questions:`, hardError || mediumError);
        continue;
      }

      questionsByCategory[category] = {
        hard: hardQuestions || [],
        medium: mediumQuestions || []
      };
    }

    // Fisher-Yates shuffle
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Build pool of all available questions with category info
    const allHardQuestions: Array<Question & { category: string }> = [];
    const allMediumQuestions: Array<Question & { category: string }> = [];

    for (const { category, count } of categoryDistribution) {
      const catQuestions = questionsByCategory[category];
      if (!catQuestions) continue;

      // Shuffle and take needed count from each category
      const shuffledHard = shuffleArray(catQuestions.hard).slice(0, count);
      const shuffledMedium = shuffleArray(catQuestions.medium).slice(0, count);

      allHardQuestions.push(...shuffledHard.map(q => ({ ...q, category })));
      allMediumQuestions.push(...shuffledMedium.map(q => ({ ...q, category })));
    }

    // Shuffle pools
    const shuffledHardPool = shuffleArray(allHardQuestions);
    const shuffledMediumPool = shuffleArray(allMediumQuestions);

    // Select 12 hard (80%) and 3 medium (20%)
    const selectedQuestions: Question[] = [
      ...shuffledHardPool.slice(0, 12),
      ...shuffledMediumPool.slice(0, 3)
    ];

    // Final shuffle to mix difficulties
    const mixedQuestions = shuffleArray(selectedQuestions);

    // Log final distribution
    const categoryCount: Record<string, number> = {};
    mixedQuestions.forEach(q => {
      categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
    });

    console.log('✅ Final mixed questions:', {
      total: mixedQuestions.length,
      byCategory: categoryCount,
      difficulty: {
        hard: mixedQuestions.filter(q => q.difficulty === 'hard').length,
        medium: mixedQuestions.filter(q => q.difficulty === 'medium').length,
      }
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

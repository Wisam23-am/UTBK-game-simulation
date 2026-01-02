'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LifeIndicator from '@/components/LifeIndicator';
import { fetchQuestions, saveGameResult, type Question } from '@/lib/game/game-helpers';
import { getCurrentUser, DEV_MODE } from '@/lib/auth/auth-helpers';

export default function GamePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string | null;
  }>>([]);

  const currentQuestion = questions[currentQuestionIndex];

  // Fetch questions and user on mount
  useEffect(() => {
    async function init() {
      try {
        // Get current user (works in both dev and prod mode)
        const { user } = await getCurrentUser();
        if (user) {
          setUserId(user.id);
          console.log('🎮 User loaded:', user.id, DEV_MODE ? '(DEV MODE)' : '');
        } else {
          console.warn('⚠️ No user found. Results will not be saved.');
        }

        // Fetch questions from Supabase
        const { data, error } = await fetchQuestions(10); // Get 10 questions

        if (error) {
          console.error('❌ Error fetching questions:', error);
          alert('Gagal memuat soal. Silakan coba lagi.');
          router.push('/');
          return;
        }

        if (!data || data.length === 0) {
          alert('Belum ada soal tersedia. Silakan jalankan database setup terlebih dahulu.');
          router.push('/');
          return;
        }

        console.log('✅ Loaded', data.length, 'questions');
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Init error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
        router.push('/');
      }
    }

    init();
  }, [router]);

  // Timer countdown
  useEffect(() => {
    if (isLoading) return;

    if (timer > 0 && lives > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 || lives === 0) {
      // Game over - save result and redirect
      handleGameEnd();
    }
  }, [timer, lives, isLoading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (label: string) => {
    if (isAnswered) return;
    setSelectedAnswer(label);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;

    setIsAnswered(true);

    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    // Save answered question details
    setAnsweredQuestions(prev => [...prev, {
      question: currentQuestion.question,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect: isCorrect,
      explanation: currentQuestion.explanation
    }]);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setLives((prev) => prev - 1);
    }

    // Move to next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Game finished - save result
        const finalScore = isCorrect ? score + 10 : score;
        const finalCorrect = isCorrect ? correctAnswers + 1 : correctAnswers;
        handleGameEnd(finalScore, finalCorrect);
      }
    }, 1500);
  };

  const handleGameEnd = async (finalScore?: number, finalCorrect?: number) => {
    const gameScore = finalScore ?? score;
    const gameCorrect = finalCorrect ?? correctAnswers;
    const timeSpent = 300 - timer;

    // Save to Supabase if user is logged in (skip in dev mode)
    if (userId && !DEV_MODE) {
      try {
        console.log('💾 Saving game result...');
        const { data, error } = await saveGameResult({
          user_id: userId,
          score: gameScore,
          correct_answers: gameCorrect,
          wrong_answers: questions.length - gameCorrect,
          total_questions: questions.length,
          time_spent: timeSpent,
          category: 'mixed', // TODO: Add category selection
          difficulty: 'mixed', // TODO: Add difficulty selection
        });

        if (error) {
          console.error('❌ Failed to save game result:', error);
          console.warn('⚠️ Continuing without saving. Make sure database schema is set up.');
        } else {
          console.log('✅ Game result saved successfully!', data);
        }
      } catch (error) {
        console.error('❌ Exception saving game result:', error);
        console.warn('⚠️ Continuing without saving. Make sure database schema is set up.');
      }
    } else if (DEV_MODE) {
      console.log('🔧 DEV MODE: Skipping save to database');
    } else {
      console.warn('⚠️ No user logged in. Game result not saved.');
    }

    // Redirect to result page
    const answersData = encodeURIComponent(JSON.stringify(answeredQuestions));
    router.push(`/hasil?score=${gameScore}&correct=${gameCorrect}&time=${timeSpent}&answers=${answersData}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-2xl font-bold text-white">Memuat soal...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">Tidak ada soal tersedia</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-3 bg-white text-[#3F72AF] font-bold rounded-xl hover:scale-105 transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF] px-3 py-4 sm:px-6 md:px-10 lg:px-16 pb-24">
      {/* Dev Mode Badge */}
      {DEV_MODE && (
        <div className="fixed top-4 right-4 z-50 px-3 py-2 bg-yellow-500/90 text-yellow-900 text-xs font-bold rounded-lg backdrop-blur-sm border border-yellow-600 shadow-lg">
          🔧 DEV MODE
        </div>
      )}

      {/* Top Bar */}
      <div className="relative z-10 mx-auto mb-6 max-w-5xl ">
        <div className="rounded-2xl bg-[#F9F7F7]/90 p-5 backdrop-blur-xl border border-[#3F72AF]/30 shadow-2xl shadow-[#3F72AF]/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#DBE2EF]/40 to-[#3F72AF]/20 px-5 py-3 transition-all hover:scale-105 border border-[#3F72AF]/50">
              <span className="text-3xl animate-pulse">⏱️</span>
              <div>
                <div className="text-xs text-[#3F72AF]">Waktu Tersisa</div>
                <span className={`text-2xl font-bold ${timer < 60 ? 'text-red-500 animate-pulse' : 'text-[#112D4E]'}`}>
                  {formatTime(timer)}
                </span>
              </div>
            </div>
            <div className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#3F72AF]/20 to-[#DBE2EF]/40 px-5 py-3 transition-all hover:scale-105 border border-[#3F72AF]/50">
              <span className="text-3xl transition-transform group-hover:rotate-12">⭐</span>
              <div>
                <div className="text-xs text-[#3F72AF]">Skor</div>
                <span className="text-2xl font-bold text-[#112D4E]">{score}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3F72AF]/20 to-[#DBE2EF]/40 px-5 py-3 border border-[#3F72AF]/50">
              <LifeIndicator lives={lives} />
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="rounded-3xl bg-[#F9F7F7]/20 p-1 backdrop-blur-xl border border-[#3F72AF]/30 shadow-2xl shadow-[#3F72AF]/20">
          <div className="rounded-3xl bg-[#F9F7F7]/95 p-4 sm:p-6 md:p-8">
            {/* Question Number & Progress */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] px-5 py-2 text-sm font-bold text-white shadow-lg">
                  🎯 Soal {currentQuestionIndex + 1} dari {questions.length}
                </span>
                <span className="text-xs px-3 py-1 bg-[#DBE2EF] text-[#3F72AF] font-semibold rounded-full">
                  {currentQuestion.category}
                </span>
              </div>
              <div className="flex-1 sm:ml-6 h-3 overflow-hidden rounded-full bg-[#DBE2EF] border border-[#3F72AF]/30">
                <div
                  className="h-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] transition-all duration-500 shadow-lg shadow-[#3F72AF]/50"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Stimulus (jika ada) */}
            {currentQuestion.stimulus && (
              <div className="mb-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 border-2 border-amber-200 shadow-lg">
                <h3 className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">
                  <span>📖</span>
                  <span>{currentQuestion.stimulus.title}</span>
                </h3>
                <div className="text-sm text-amber-900/90 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
                  {currentQuestion.stimulus.content.replace(/\\n/g, '\n')}
                </div>
              </div>
            )}

            {/* Question Text */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#DBE2EF]/40 to-[#3F72AF]/10 p-6 backdrop-blur-sm border border-[#3F72AF]/30">
              <h2 className="text-2xl font-bold text-[#112D4E] md:text-3xl">{currentQuestion.question}</h2>
            </div>

            {/* Options */}
            <div className="mb-6 space-y-4">
              {currentQuestion.options.map((option: { label: string; text: string }) => {
                const isCorrectAnswer = option.label === currentQuestion.correct_answer;
                const isSelectedAnswer = option.label === selectedAnswer;
                const status = isAnswered
                  ? isCorrectAnswer
                    ? 'correct'
                    : isSelectedAnswer
                    ? 'wrong'
                    : 'disabled'
                  : isSelectedAnswer
                  ? 'selected'
                  : 'idle';

                const isCorrect = status === 'correct';
                const isWrong = status === 'wrong';
                const isSelected = status === 'selected';

                return (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                    disabled={isAnswered}
                    className={`group w-full rounded-2xl p-4 sm:p-5 transition-all duration-300 border-2 ${
                      isCorrect && 'border-green-500 bg-green-50'
                    } ${isWrong && 'border-red-500 bg-red-50'} ${
                      isSelected && 'border-[#3F72AF] bg-[#DBE2EF]'
                    } ${
                      status === 'idle' &&
                      'border-[#DBE2EF] hover:border-[#3F72AF]/50 hover:bg-[#DBE2EF]/30'
                    } ${isAnswered && status === 'disabled' && 'opacity-50 cursor-not-allowed'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold transition-all ${
                          isCorrect
                            ? 'bg-green-500 text-white'
                            : isWrong
                            ? 'bg-red-500 text-white'
                            : isSelected
                            ? 'bg-[#3F72AF] text-white'
                            : 'bg-[#DBE2EF] text-[#112D4E] group-hover:bg-[#3F72AF] group-hover:text-white'
                        }`}
                      >
                        {option.label}
                      </span>
                      <span
                        className={`flex-1 text-left text-lg transition-colors ${
                          isCorrect || isWrong || isSelected
                            ? 'text-[#112D4E] font-semibold'
                            : 'text-[#3F72AF] group-hover:text-[#112D4E]'
                        }`}
                      >
                        {option.text}
                      </span>
                      {isCorrect && <span className="text-3xl animate-bounce">✅</span>}
                      {isWrong && <span className="text-3xl animate-bounce">❌</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!isAnswered && (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={`group relative w-full overflow-hidden rounded-2xl px-8 py-5 text-xl font-bold transition-all duration-300 ${
                  selectedAnswer
                    ? 'bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white shadow-2xl shadow-[#3F72AF]/50 hover:scale-105 active:scale-95'
                    : 'bg-[#DBE2EF] text-[#3F72AF]/50 cursor-not-allowed'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {selectedAnswer ? (
                    <>
                      <span className="transition-transform group-hover:scale-110">🚀</span>
                      <span>Jawab Sekarang!</span>
                    </>
                  ) : (
                    <>
                      <span>⚠️</span>
                      <span>Pilih Jawaban Dulu</span>
                    </>
                  )}
                </span>
                {selectedAnswer && <div className="absolute inset-0 shimmer"></div>}
              </button>
            )}

            {/* Feedback */}
            {isAnswered && (
              <div
                className={`animate-scale-in rounded-2xl p-6 backdrop-blur-sm border-2 ${
                  selectedAnswer === currentQuestion.correct_answer
                    ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50'
                    : 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50'
                }`}
              >
                <p className="mb-2 text-4xl animate-bounce text-center">
                  {selectedAnswer === currentQuestion.correct_answer ? '🎉' : '💔'}
                </p>
                <p
                  className={`text-2xl font-bold text-center ${
                    selectedAnswer === currentQuestion.correct_answer ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {selectedAnswer === currentQuestion.correct_answer ? 'Jawaban Benar!' : 'Jawaban Salah!'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

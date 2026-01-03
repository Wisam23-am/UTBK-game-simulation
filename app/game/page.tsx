"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LifeIndicator from "@/components/LifeIndicator";
import FireIcon from "@/components/FireIcon";
import {
  fetchMixedQuestions,
  saveGameResult,
  type Question,
} from "@/lib/game/game-helpers";
import { getCurrentUser, DEV_MODE } from "@/lib/auth/auth-helpers";

export default function GamePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(600); // 10 minutes for 15 mixed questions
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(
    Date.now()
  );
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showStreakAnimation, setShowStreakAnimation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Array<{
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      explanation: string | null;
      timeSpent: number;
      earnedPoints: number;
    }>
  >([]);

  const currentQuestion = questions[currentQuestionIndex];

  // Fetch questions and user on mount
  useEffect(() => {
    async function init() {
      try {
        // Get current user (works in both dev and prod mode)
        const { user } = await getCurrentUser();
        if (user) {
          setUserId(user.id);
          console.log("🎮 User loaded:", user.id, DEV_MODE ? "(DEV MODE)" : "");
        } else {
          // Redirect to login if not authenticated and not in dev mode
          if (!DEV_MODE) {
            console.warn("⚠️ User not authenticated. Redirecting to login...");
            router.push("/login");
            return;
          }
          console.warn("⚠️ No user found. Results will not be saved.");
        }

        // Fetch mixed questions from ALL categories (balanced distribution)
        const { data, error } = await fetchMixedQuestions(); // 15 questions: PU(3) + 6 others(2 each)

        if (error) {
          console.error("❌ Error fetching questions:", error);
          alert("Gagal memuat soal. Silakan coba lagi.");
          router.push("/");
          return;
        }

        if (!data || data.length === 0) {
          alert(
            "Belum ada soal tersedia. Silakan jalankan database setup terlebih dahulu."
          );
          router.push("/");
          return;
        }

        console.log(
          "✅ Loaded",
          data.length,
          "mixed questions (60% hard, 40% medium)"
        );
        setQuestions(data);
        setQuestionStartTime(Date.now());
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Init error:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
        router.push("/");
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
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (label: string) => {
    if (isAnswered) return;
    setSelectedAnswer(label);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;

    setIsAnswered(true);

    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    const timeSpentOnQuestion = Math.floor(
      (Date.now() - questionStartTime) / 1000
    ); // in seconds

    let earnedPoints = 0;
    let newStreak = streak;

    if (isCorrect) {
      // Base points for correct answer
      const basePoints = 1000;

      // Time bonus: 5 points per second (faster = more points)
      // Max 30 seconds for full bonus (150 points), after that no time bonus
      const timeBonus = Math.max(0, (30 - timeSpentOnQuestion) * 5);

      // Streak bonus
      newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }

      // Streak multiplier: every 3 correct answers in a row = 1.5x multiplier
      const streakMultiplier = newStreak >= 3 ? 1.5 : 1;

      // Calculate total points
      earnedPoints = Math.floor((basePoints + timeBonus) * streakMultiplier);

      setScore((prev) => prev + earnedPoints);
      setCorrectAnswers((prev) => prev + 1);

      // Show streak animation for streaks >= 3
      if (newStreak >= 3) {
        setShowStreakAnimation(true);
        setTimeout(() => setShowStreakAnimation(false), 2000);
      }
    } else {
      // Wrong answer: reset streak and lose a life
      setStreak(0);
      setLives((prev) => prev - 1);
      earnedPoints = 0;
    }

    // Save answered question details
    const newAnsweredQuestion = {
      question: currentQuestion.question,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect: isCorrect,
      explanation: currentQuestion.explanation,
      timeSpent: timeSpentOnQuestion,
      earnedPoints: earnedPoints,
    };

    const updatedAnsweredQuestions = [
      ...answeredQuestions,
      newAnsweredQuestion,
    ];
    setAnsweredQuestions(updatedAnsweredQuestions);

    // Move to next question after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setQuestionStartTime(Date.now()); // Reset timer for next question
      } else {
        // Game finished - save result
        const finalScore = score + earnedPoints;
        const finalCorrect = isCorrect ? correctAnswers + 1 : correctAnswers;
        handleGameEnd(finalScore, finalCorrect, updatedAnsweredQuestions);
      }
    }, 2000);
  };

  const handleGameEnd = async (
    finalScore?: number,
    finalCorrect?: number,
    finalAnsweredQuestions?: typeof answeredQuestions
  ) => {
    const gameScore = finalScore ?? score;
    const gameCorrect = finalCorrect ?? correctAnswers;
    const timeSpent = 600 - timer; // 600 seconds (10 minutes) total time
    const answersToSend = finalAnsweredQuestions ?? answeredQuestions;

    // Save to Supabase if user is logged in (skip in dev mode)
    if (userId && !DEV_MODE) {
      try {
        console.log("💾 Saving game result...");
        const { data, error } = await saveGameResult({
          user_id: userId,
          score: gameScore,
          correct_answers: gameCorrect,
          wrong_answers: questions.length - gameCorrect,
          total_questions: questions.length,
          time_spent: timeSpent,
          category: "Mixed", // Mixed categories (PU, PBM, PM, PPU, PK, LBI)
          difficulty: "mixed",
        });

        if (error) {
          console.error("❌ Failed to save game result:", error);
          console.warn(
            "⚠️ Continuing without saving. Make sure database schema is set up."
          );
        } else {
          console.log("✅ Game result saved successfully!", data);
        }
      } catch (error) {
        console.error("❌ Exception saving game result:", error);
        console.warn(
          "⚠️ Continuing without saving. Make sure database schema is set up."
        );
      }
    } else if (DEV_MODE) {
      console.log("🔧 DEV MODE: Skipping save to database");
    } else {
      console.warn("⚠️ No user logged in. Game result not saved.");
    }

    // Redirect to result page
    const answersData = encodeURIComponent(JSON.stringify(answersToSend));
    router.push(
      `/hasil?score=${gameScore}&correct=${gameCorrect}&time=${timeSpent}&answers=${answersData}`
    );
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
          <p className="text-2xl font-bold text-white">
            Tidak ada soal tersedia
          </p>
          <button
            onClick={() => router.push("/")}
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
                <span
                  className={`text-2xl font-bold ${
                    timer < 60 ? "text-red-500 animate-pulse" : "text-[#112D4E]"
                  }`}
                >
                  {formatTime(timer)}
                </span>
              </div>
            </div>
            <div className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#3F72AF]/20 to-[#DBE2EF]/40 px-5 py-3 transition-all hover:scale-105 border border-[#3F72AF]/50">
              <span className="text-3xl transition-transform group-hover:rotate-12">
                ⭐
              </span>
              <div>
                <div className="text-xs text-[#3F72AF]">Skor</div>
                <span className="text-2xl font-bold text-[#112D4E]">
                  {score}
                </span>
              </div>
            </div>
            {/* Streak Indicator */}
            <div
              className={`flex items-center gap-3 rounded-xl px-5 py-3 transition-all border ${
                streak >= 3
                  ? "bg-gradient-to-r from-orange-400 to-red-500 border-orange-600 animate-pulse"
                  : "bg-gradient-to-r from-[#3F72AF]/20 to-[#DBE2EF]/40 border-[#3F72AF]/50"
              }`}
            >
              <div className="relative">
                <FireIcon active={streak >= 3} size="lg" />
              </div>
              <div>
                <div
                  className={`text-xs ${
                    streak >= 3 ? "text-white" : "text-[#3F72AF]"
                  }`}
                >
                  Streak
                </div>
                <span
                  className={`text-2xl font-bold ${
                    streak >= 3 ? "text-white" : "text-[#112D4E]"
                  }`}
                >
                  {streak}x
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3F72AF]/20 to-[#DBE2EF]/40 px-5 py-3 border border-[#3F72AF]/50">
              <LifeIndicator lives={lives} />
            </div>
          </div>
        </div>
      </div>

      {/* Streak Animation */}
      {showStreakAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-scale-in">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-8 rounded-3xl shadow-2xl border-4 border-yellow-400">
            <div className="flex items-center justify-center mb-4">
              <FireIcon active={true} size="xl" />
            </div>
            <p className="text-5xl font-bold text-center mb-2">STREAK!</p>
            <p className="text-3xl font-bold text-center">{streak}x Combo!</p>
            <p className="text-lg text-center mt-2 text-yellow-100">
              Bonus Multiplier 1.5x!
            </p>
          </div>
        </div>
      )}

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
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / questions.length) * 100
                    }%`,
                  }}
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
                <div
                  className="text-sm text-amber-900/90 leading-relaxed"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {currentQuestion.stimulus.content.replace(/\\n/g, "\n")}
                </div>
              </div>
            )}

            {/* Question Text */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#DBE2EF]/40 to-[#3F72AF]/10 p-6 backdrop-blur-sm border border-[#3F72AF]/30">
              <h2 className="text-2xl font-bold text-[#112D4E] md:text-3xl">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="mb-6 space-y-4">
              {currentQuestion.options.map(
                (option: { label: string; text: string }) => {
                  const isCorrectAnswer =
                    option.label === currentQuestion.correct_answer;
                  const isSelectedAnswer = option.label === selectedAnswer;
                  const status = isAnswered
                    ? isCorrectAnswer
                      ? "correct"
                      : isSelectedAnswer
                      ? "wrong"
                      : "disabled"
                    : isSelectedAnswer
                    ? "selected"
                    : "idle";

                  const isCorrect = status === "correct";
                  const isWrong = status === "wrong";
                  const isSelected = status === "selected";

                  return (
                    <button
                      key={option.label}
                      onClick={() => handleAnswerSelect(option.label)}
                      disabled={isAnswered}
                      className={`group w-full rounded-2xl p-4 sm:p-5 transition-all duration-300 border-2 ${
                        isCorrect && "border-green-500 bg-green-50"
                      } ${isWrong && "border-red-500 bg-red-50"} ${
                        isSelected && "border-[#3F72AF] bg-[#DBE2EF]"
                      } ${
                        status === "idle" &&
                        "border-[#DBE2EF] hover:border-[#3F72AF]/50 hover:bg-[#DBE2EF]/30"
                      } ${
                        isAnswered &&
                        status === "disabled" &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold transition-all ${
                            isCorrect
                              ? "bg-green-500 text-white"
                              : isWrong
                              ? "bg-red-500 text-white"
                              : isSelected
                              ? "bg-[#3F72AF] text-white"
                              : "bg-[#DBE2EF] text-[#112D4E] group-hover:bg-[#3F72AF] group-hover:text-white"
                          }`}
                        >
                          {option.label}
                        </span>
                        <span
                          className={`flex-1 text-left text-lg transition-colors ${
                            isCorrect || isWrong || isSelected
                              ? "text-[#112D4E] font-semibold"
                              : "text-[#3F72AF] group-hover:text-[#112D4E]"
                          }`}
                        >
                          {option.text}
                        </span>
                        {isCorrect && (
                          <span className="text-3xl animate-bounce">✅</span>
                        )}
                        {isWrong && (
                          <span className="text-3xl animate-bounce">❌</span>
                        )}
                      </div>
                    </button>
                  );
                }
              )}
            </div>

            {/* Submit Button */}
            {!isAnswered && (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={`group relative w-full overflow-hidden rounded-2xl px-8 py-5 text-xl font-bold transition-all duration-300 ${
                  selectedAnswer
                    ? "bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white shadow-2xl shadow-[#3F72AF]/50 hover:scale-105 active:scale-95"
                    : "bg-[#DBE2EF] text-[#3F72AF]/50 cursor-not-allowed"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {selectedAnswer ? (
                    <>
                      <span className="transition-transform group-hover:scale-110">
                        🚀
                      </span>
                      <span>Jawab Sekarang!</span>
                    </>
                  ) : (
                    <>
                      <span>⚠️</span>
                      <span>Pilih Jawaban Dulu</span>
                    </>
                  )}
                </span>
                {selectedAnswer && (
                  <div className="absolute inset-0 shimmer"></div>
                )}
              </button>
            )}

            {/* Feedback */}
            {isAnswered && (
              <div
                className={`animate-scale-in rounded-2xl p-6 backdrop-blur-sm border-2 ${
                  selectedAnswer === currentQuestion.correct_answer
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50"
                    : "border-red-500 bg-gradient-to-r from-red-50 to-pink-50"
                }`}
              >
                <p className="mb-2 text-4xl animate-bounce text-center">
                  {selectedAnswer === currentQuestion.correct_answer
                    ? "🎉"
                    : "💔"}
                </p>
                <p
                  className={`text-2xl font-bold text-center ${
                    selectedAnswer === currentQuestion.correct_answer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedAnswer === currentQuestion.correct_answer
                    ? "Jawaban Benar!"
                    : "Jawaban Salah!"}
                </p>
                {selectedAnswer === currentQuestion.correct_answer &&
                  answeredQuestions.length > 0 && (
                    <div className="mt-4 text-center">
                      <p className="text-3xl font-bold text-green-600 animate-pulse">
                        +
                        {
                          answeredQuestions[answeredQuestions.length - 1]
                            .earnedPoints
                        }{" "}
                        Poin
                      </p>
                      {streak >= 3 && (
                        <p className="text-sm text-orange-600 font-semibold mt-1">
                          🔥 Bonus Streak {streak}x (Multiplier 1.5x)
                        </p>
                      )}
                    </div>
                  )}
                {selectedAnswer !== currentQuestion.correct_answer && (
                  <p className="mt-3 text-center text-red-600 font-semibold">
                    Streak Reset! 💔
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

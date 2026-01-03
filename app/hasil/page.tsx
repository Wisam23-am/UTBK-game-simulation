"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Home, RotateCcw } from "lucide-react";
import LeaderboardCard from "@/components/LeaderboardCard";
import Dock from "@/components/Dock";

type AnsweredQuestion = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string | null;
  timeSpent: number;
  earnedPoints: number;
};

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const score = parseInt(searchParams.get("score") || "0");
  const correct = parseInt(searchParams.get("correct") || "0");
  const time = parseInt(searchParams.get("time") || "0");
  const answersData = searchParams.get("answers");

  const [showReview, setShowReview] = useState(false);

  // Parse answered questions
  const answeredQuestions: AnsweredQuestion[] = answersData
    ? JSON.parse(decodeURIComponent(answersData))
    : [];

  const totalQuestions = 15; // Fixed: always 15 questions in current game format
  const percentage = (correct / totalQuestions) * 100;

  // Replace history to redirect back to study page instead of game
  useEffect(() => {
    // Replace the current history entry to include study page in the back stack
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      router.replace("/study");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  // Calculate max streak from answered questions
  let maxStreak = 0;
  let currentStreak = 0;
  answeredQuestions.forEach((q) => {
    if (q.isCorrect) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  });

  // Tentukan grade berdasarkan jumlah benar (15 soal total)
  const getGrade = () => {
    if (correct >= 14)
      return { grade: "A+", label: "Sempurna!", color: "#3F72AF" }; // 93%+
    if (correct >= 13)
      return { grade: "A", label: "Luar Biasa!", color: "#3F72AF" }; // 87%+
    if (correct >= 11) return { grade: "B", label: "Bagus!", color: "#3F72AF" }; // 73%+
    if (correct >= 9) return { grade: "C", label: "Cukup", color: "#3F72AF" }; // 60%+
    if (correct >= 7) return { grade: "D", label: "Kurang", color: "#112D4E" }; // 47%+
    return { grade: "E", label: "Astagfirullah", color: "#112D4E" }; // <47%
  };

  const gradeInfo = getGrade();
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF] to-[#3F72AF] p-4 pb-28">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#3F72AF] opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-[#112D4E] opacity-30 blur-3xl [animation-delay:1s]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#3F72AF] opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          {/* Main Result Card */}
          <div className="rounded-3xl bg-[#F9F7F7]/95 p-8 backdrop-blur-xl shadow-2xl border border-[#3F72AF]/30 animate-scale-in">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#112D4E] mb-2">
                {gradeInfo.label}
              </h1>
              <p className="text-[#3F72AF] text-lg">Hasil Simulasi UTBK Anda</p>
            </div>

            {/* Grade Circle */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                {/* Outer circle background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF] flex items-center justify-center animate-pulse">
                  {/* Inner circle */}
                  <div className="w-40 h-40 rounded-full bg-[#F9F7F7] flex flex-col items-center justify-center shadow-xl">
                    <div className="text-6xl font-bold text-[#3F72AF] mb-2">
                      {gradeInfo.grade}
                    </div>
                    <div className="text-sm text-[#112D4E] font-semibold">
                      {percentage.toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Score */}
              <div className="rounded-2xl bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]/20 p-6 border border-[#3F72AF]/30 text-center">
                <div className="text-sm text-[#3F72AF] font-semibold mb-2">
                  Skor Total
                </div>
                <div className="text-4xl font-bold text-[#112D4E]">{score}</div>
                <div className="text-xs text-[#3F72AF] mt-1">poin</div>
              </div>

              {/* Correct Answers */}
              <div className="rounded-2xl bg-gradient-to-br from-[#3F72AF]/20 to-[#DBE2EF] p-6 border border-[#3F72AF]/30 text-center">
                <div className="text-sm text-[#3F72AF] font-semibold mb-2">
                  Jawaban Benar
                </div>
                <div className="text-4xl font-bold text-[#112D4E]">
                  {correct}
                </div>
                <div className="text-xs text-[#3F72AF] mt-1">soal</div>
              </div>

              {/* Time */}
              <div className="rounded-2xl bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]/20 p-6 border border-[#3F72AF]/30 text-center">
                <div className="text-sm text-[#3F72AF] font-semibold mb-2">
                  Waktu
                </div>
                <div className="text-4xl font-bold text-[#112D4E]">
                  {minutes > 0
                    ? `${minutes}:${seconds.toString().padStart(2, "0")}`
                    : `${seconds}s`}
                </div>
                <div className="text-xs text-[#3F72AF] mt-1">menit</div>
              </div>
            </div>

            {/* Max Streak Badge */}
            {maxStreak >= 3 && (
              <div className="mb-6 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 p-4 text-center border-2 border-yellow-400 animate-pulse">
                <p className="text-white font-bold text-lg mb-1">
                  🔥 Max Streak Achievement!
                </p>
                <p className="text-yellow-100 text-3xl font-bold">
                  {maxStreak}x Combo
                </p>
                <p className="text-yellow-100 text-sm mt-1">
                  Jawaban benar beruntun terpanjang!
                </p>
              </div>
            )}

            {/* Performance Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-[#112D4E]">
                  Performa Anda
                </span>
                <span className="text-sm font-bold text-[#3F72AF]">
                  {percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-4 bg-[#DBE2EF] rounded-full overflow-hidden border border-[#3F72AF]/30">
                <div
                  className="h-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] transition-all duration-1000 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Feedback Message */}
            <div className="rounded-2xl bg-gradient-to-r from-[#3F72AF]/10 to-[#DBE2EF]/30 p-6 border border-[#3F72AF]/30 mb-8 text-center">
              <p className="text-[#112D4E] font-semibold mb-2">💡 Feedback</p>
              <p className="text-[#3F72AF] text-sm leading-relaxed">
                {correct >= 14
                  ? "Luar biasa! Anda sudah menguasai materi dengan sangat baik. Terus pertahankan performa ini!"
                  : correct >= 13
                  ? "Sangat bagus! Anda memahami sebagian besar materi. Pelajari kembali soal yang salah."
                  : correct >= 11
                  ? "Bagus! Anda sudah cukup memahami materi. Tingkatkan lagi dengan latihan lebih banyak."
                  : correct >= 9
                  ? "Cukup baik. Masih ada ruang untuk berkembang. Fokus pada materi yang masih lemah."
                  : correct >= 7
                  ? "Hasil ini menunjukkan Anda perlu lebih banyak latihan. Jangan menyerah, terus belajar!"
                  : "Al-Qur'an berulang kali bertanya, Afala Taqilun? (Apakah kamu tidak menggunakan akalmu?). Tingkatkan usaha belajarmu, masa depanmu bergantung padanya!"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Link href="/" className="block">
                <button className="w-full py-4 px-6 bg-[#DBE2EF] hover:bg-[#3F72AF]/20 text-[#3F72AF] font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-[#3F72AF]/30">
                  <Home size={20} />
                  <span>Ke Beranda</span>
                </button>
              </Link>
              <Link href="/study" className="block">
                <button className="w-full py-4 px-6 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] hover:from-[#112D4E] hover:to-[#3F72AF] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#3F72AF]/50">
                  <RotateCcw size={20} />
                  <span>Coba Lagi</span>
                </button>
              </Link>
            </div>

            {/* Review Answers Button */}
            {answeredQuestions.length > 0 && (
              <button
                onClick={() => setShowReview(!showReview)}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>{showReview ? "📕" : "📖"}</span>
                <span>
                  {showReview ? "Tutup Review Jawaban" : "Lihat Review Jawaban"}
                </span>
              </button>
            )}

            {/* Bottom Message */}
            <div className="mt-8 pt-6 border-t border-[#3F72AF]/20 text-center">
              <p className="text-xs text-[#3F72AF]/70">
                ✨ Setiap latihan membawamu lebih dekat ke kesuksesan UTBK
              </p>
            </div>
          </div>

          {/* Review Answers Section */}
          {showReview && answeredQuestions.length > 0 && (
            <div className="mt-6 rounded-3xl bg-[#F9F7F7]/95 p-8 backdrop-blur-xl shadow-2xl border border-[#3F72AF]/30 animate-scale-in">
              <h2 className="text-2xl font-bold text-[#112D4E] mb-6 text-center">
                📚 Review Jawaban
              </h2>

              <div className="space-y-4">
                {answeredQuestions.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-6 border-2 transition-all ${
                      item.isCorrect
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                        : "bg-gradient-to-br from-red-50 to-pink-50 border-red-300"
                    }`}
                  >
                    {/* Question Number and Status */}
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-700">
                          Soal #{index + 1}
                        </span>
                        {item.isCorrect && (
                          <>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                              ⏱️ {item.timeSpent}s
                            </span>
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">
                              ⭐ +{item.earnedPoints} poin
                            </span>
                          </>
                        )}
                      </div>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-bold ${
                          item.isCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {item.isCorrect ? "✓ Benar" : "✗ Salah"}
                      </span>
                    </div>

                    {/* Question Text */}
                    <div className="mb-4 p-4 bg-white/50 rounded-xl border border-gray-200">
                      <p className="text-gray-800 font-medium leading-relaxed">
                        {item.question}
                      </p>
                    </div>

                    {/* Answers Comparison */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {/* User Answer */}
                      <div
                        className={`p-4 rounded-xl border-2 ${
                          item.isCorrect
                            ? "bg-green-100 border-green-400"
                            : "bg-red-100 border-red-400"
                        }`}
                      >
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          Jawaban Anda:
                        </p>
                        <p
                          className={`font-bold text-lg ${
                            item.isCorrect ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {item.userAnswer}
                        </p>
                      </div>

                      {/* Correct Answer */}
                      <div className="p-4 rounded-xl border-2 bg-green-100 border-green-400">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          Jawaban Benar:
                        </p>
                        <p className="font-bold text-lg text-green-700">
                          {item.correctAnswer}
                        </p>
                      </div>
                    </div>

                    {/* Explanation */}
                    {item.explanation && (
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-2">
                          <span>💡</span>
                          <span>Penjelasan:</span>
                        </p>
                        <p className="text-sm text-blue-900 leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Section */}
          <div
            className="mt-6 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <LeaderboardCard compact />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4">
        <Dock />
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-slate-600">Memuat hasil...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}

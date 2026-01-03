"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeaderboardCard from "@/components/LeaderboardCard";
import Dock from "@/components/Dock";
import { getCurrentUser, getUserProfile } from "@/lib/auth/auth-helpers";

export default function StudyPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { user } = await getCurrentUser();
      if (user) {
        // Try to get username from profile
        const { profile } = await getUserProfile(user.id);
        if (profile && profile.username) {
          setUserName(profile.username);
        } else if (profile && profile.full_name) {
          setUserName(profile.full_name);
        } else if (user.email) {
          setUserName(user.email.split("@")[0]);
        }
      } else {
        // Redirect to login if not authenticated
        router.push("/login");
        return;
      }
      setIsLoading(false);
    }
    loadUser();
  }, [router]);

  const handleGameMode = () => {
    router.push("/game");
  };

  const handleTryOutMode = () => {
    // Coming soon
    alert(
      "🚧 Try-Out Mode segera hadir!\n\nFitur yang akan tersedia:\n• Simulasi UTBK lengkap\n• Scoring realistis (0-1000)\n• Analytics mendalam\n• Review mode lengkap\n\nGunakan Game Mode untuk latihan! 🎮"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4">
        {/* Decorative blob */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>

        <div className="relative max-w-6xl mx-auto text-center mb-12">
          {!isLoading && userName && (
            <div className="inline-block mb-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg">
              <p className="text-lg font-semibold">👋 Halo, {userName}!</p>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Pilih Mode Latihan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tingkatkan kemampuan UTBK-mu dengan latihan yang tepat
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto px-4">
          {/* Game Mode Card */}
          <div
            onClick={handleGameMode}
            className="group relative bg-white rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-gray-200 hover:border-blue-400"
          >
            {/* Badge */}
            <div className="absolute top-6 right-6 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              ⚡ AVAILABLE
            </div>

            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-4xl">🎮</span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-gray-800 mb-3">Game Mode</h3>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Latihan cepat dengan soal campuran dari semua kategori UTBK. Raih
              skor tertinggi dan kompetisi di leaderboard!
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                  ⏱️
                </span>
                <span className="font-medium">10 menit • 15 soal campuran</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                  🎯
                </span>
                <span className="font-medium">
                  7 kategori UTBK (PU, PK, LBI, LBE, PM, dll)
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                  🔥
                </span>
                <span className="font-medium">
                  80% hard • Streak & time bonus
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                  🏆
                </span>
                <span className="font-medium">
                  Public leaderboard • 3 nyawa
                </span>
              </div>
            </div>

            {/* Button */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Mulai Game Mode →
            </button>
          </div>

          {/* Try-Out Mode Card */}
          <div
            onClick={handleTryOutMode}
            className="group relative bg-white rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-dashed border-gray-300 hover:border-purple-400 opacity-80 hover:opacity-100"
          >
            {/* Badge */}
            <div className="absolute top-6 right-6 bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              🚧 SOON
            </div>

            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg opacity-75">
              <span className="text-4xl">📝</span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              Try-Out Mode
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Simulasi UTBK lengkap dengan scoring realistis dan analytics
              mendalam. Perfect untuk persiapan ujian sebenarnya!
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                  ⏱️
                </span>
                <span className="font-medium">
                  2-3 jam • 105+ soal (TPS + Skolastik)
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                  🎯
                </span>
                <span className="font-medium">
                  Multi-section dengan timer per bagian
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                  📊
                </span>
                <span className="font-medium">
                  IRT scoring (0-1000) seperti UTBK asli
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                  📖
                </span>
                <span className="font-medium">
                  Private analytics • Full review mode
                </span>
              </div>
            </div>

            {/* Button */}
            <button className="w-full bg-gray-400 text-white font-bold py-4 px-6 rounded-xl cursor-not-allowed">
              Dalam Pengembangan
            </button>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              🏆 Top 5 Leaderboard
            </h2>
            <p className="text-gray-600 text-lg">
              Lihat siapa yang menduduki peringkat teratas minggu ini
            </p>
          </div>

          <LeaderboardCard />
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Tips Memaksimalkan Latihan
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Fokus ke akurasi di awal untuk build streak bonus</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Setelah streak aktif (≥3), tingkatkan kecepatan</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Target 40-60 detik per soal untuk hasil optimal</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Review jawaban salah untuk belajar dari kesalahan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4">
        <Dock />
      </div>
    </div>
  );
}

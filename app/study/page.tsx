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
      "🚧 Try-Out Mode segera hadir!\n\nFitur yang akan tersedia:\n• Simulasi SNBT lengkap\n• Scoring realistis (0-1000)\n• Analytics mendalam\n• Review mode lengkap\n\nGunakan Game Mode untuk latihan! 🎮",
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF] to-[#3F72AF]/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4">
        {/* Decorative blob */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#3F72AF]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>

        {/* Maskot Buaya Belajar */}
        <div className="absolute top-16 left-10 w-32 md:w-36 hidden lg:block opacity-80">
          <img
            src="/mascots/dino-book.png"
            alt="Dino Scholar"
            className="w-full h-auto drop-shadow-xl"
          />
        </div>

        {/* Maskot Hiu Cerdas */}
        <div className="absolute top-16 right-16 w-28 md:w-32 hidden xl:block opacity-70">
          <img
            src="/mascots/shark-thinking.png"
            alt="Professor Sharky"
            className="w-full h-auto drop-shadow-xl"
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center mb-12">
          {!isLoading && userName && (
            <div className="inline-block mb-4 px-6 py-3 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white rounded-full shadow-xl border-2 border-[#F9F7F7]/30">
              <p className="text-lg font-bold drop-shadow-md">
                👋 Halo, {userName}!
              </p>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-[#112D4E] mb-4">
            Pilih Mode Latihan
          </h1>
          <p className="text-xl text-[#3F72AF] max-w-2xl mx-auto font-semibold">
            Tingkatkan kemampuan UTBK-mu dengan latihan yang tepat
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto px-4">
          {/* Game Mode Card */}
          <div
            onClick={handleGameMode}
            className="group relative bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] rounded-3xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-[#3F72AF]/40 hover:border-[#3F72AF] overflow-hidden"
          >
            {/* Maskot Mini Buaya */}
            <div className="absolute -bottom-4 -right-4 w-24 opacity-15 group-hover:opacity-20 transition-opacity">
              <img
                src="/mascots/dino-wave.png"
                alt="Dino"
                className="w-full h-auto"
              />
            </div>

            {/* Badge */}
            <div className="absolute top-6 right-6 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
              ⚡ AVAILABLE
            </div>

            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-[#3F72AF] to-[#112D4E] rounded-2xl flex items-center justify-center mb-6 shadow-xl">
              <span className="text-4xl">🎮</span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-[#112D4E] mb-3">
              Game Mode
            </h3>

            {/* Description */}
            <p className="text-[#112D4E]/80 mb-6 leading-relaxed text-lg font-medium">
              Latihan cepat dengan soal campuran dari semua kategori UTBK. Raih
              skor tertinggi dan kompetisi di leaderboard!
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-[#112D4E]">
                <span className="w-6 h-6 bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]/30 rounded-full flex items-center justify-center text-[#3F72AF] font-bold text-xs border border-[#3F72AF]/30">
                  ⏱️
                </span>
                <span className="font-semibold">
                  10 menit • 15 soal campuran
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#112D4E]">
                <span className="w-6 h-6 bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]/30 rounded-full flex items-center justify-center text-[#3F72AF] font-bold text-xs border border-[#3F72AF]/30">
                  🎯
                </span>
                <span className="font-semibold">
                  7 kategori UTBK (PU, PK, LBI, LBE, PM, dll)
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#112D4E]">
                <span className="w-6 h-6 bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]/30 rounded-full flex items-center justify-center text-[#3F72AF] font-bold text-xs border border-[#3F72AF]/30">
                  🔥
                </span>
                <span className="font-semibold">
                  80% hard • Streak & time bonus
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#112D4E]">
                <span className="w-6 h-6 bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]/30 rounded-full flex items-center justify-center text-[#3F72AF] font-bold text-xs border border-[#3F72AF]/30">
                  🏆
                </span>
                <span className="font-semibold">
                  Public leaderboard • 3 nyawa
                </span>
              </div>
            </div>

            {/* Button */}
            <button className="w-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl border-2 border-[#112D4E]/30">
              Mulai Game Mode →
            </button>
          </div>

          {/* Try-Out Mode Card */}
          <div
            onClick={handleTryOutMode}
            className="group relative bg-gradient-to-br from-[#DBE2EF] to-[#F9F7F7] rounded-3xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-dashed border-[#3F72AF]/30 hover:border-purple-400 opacity-80 hover:opacity-100 overflow-hidden"
          >
            {/* Maskot Mini Hiu */}
            <div className="absolute -top-4 -left-4 w-20 opacity-12 group-hover:opacity-18 transition-opacity">
              <img
                src="/mascots/shark-tablet.png"
                alt="Shark"
                className="w-full h-auto"
              />
            </div>

            {/* Badge */}
            <div className="absolute top-6 right-6 bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
              🚧 SOON
            </div>

            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl opacity-75">
              <span className="text-4xl">📝</span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-[#112D4E] mb-3">
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

      {/* Tips Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] rounded-3xl p-8 shadow-2xl border-2 border-[#3F72AF]/40">
            <h3 className="text-2xl font-bold text-[#112D4E] mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Tips Memaksimalkan Latihan
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-[#112D4E]">
              <div className="flex items-start gap-3">
                <span className="text-[#3F72AF] font-bold text-xl">•</span>
                <span className="font-medium">
                  Fokus ke akurasi di awal untuk build streak bonus
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#3F72AF] font-bold text-xl">•</span>
                <span className="font-medium">
                  Setelah streak aktif (≥3), tingkatkan kecepatan
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#3F72AF] font-bold text-xl">•</span>
                <span className="font-medium">
                  Target 40-60 detik per soal untuk hasil optimal
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#3F72AF] font-bold text-xl">•</span>
                <span className="font-medium">
                  Review jawaban salah untuk belajar dari kesalahan
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#112D4E] mb-3">
              🏆 Top 5 Leaderboard
            </h2>
            <p className="text-[#3F72AF] text-lg font-semibold">
              Lihat siapa yang menduduki peringkat teratas minggu ini
            </p>
          </div>

          <LeaderboardCard />
        </div>
      </section>

      <Footer />
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4">
        <Dock />
      </div>
    </div>
  );
}

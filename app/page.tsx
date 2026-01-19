"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeaderboardCard from "@/components/LeaderboardCard";
import Dock from "@/components/Dock";
import { getCurrentUser, getUserProfile } from "@/lib/auth/auth-helpers";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const { user } = await getCurrentUser();

      if (user) {
        setIsLoggedIn(true);

        // Try to get username from profile
        const { profile } = await getUserProfile(user.id);
        if (profile && profile.username) {
          setUserName(profile.username);
        } else if (profile && profile.full_name) {
          setUserName(profile.full_name);
        } else if (user.email) {
          // Fallback to email username if profile doesn't exist yet
          setUserName(user.email.split("@")[0]);
        } else {
          setUserName("User");
        }

        console.log("✅ User logged in:", userName);
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF] to-[#3F72AF]/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3F72AF]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-[#112D4E]/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Maskot Hiu Cerdas - Kanan Atas */}
        <div className="absolute top-20 right-10 w-24 md:w-32 lg:w-36 hidden sm:block opacity-90">
          <img
            src="/mascots/shark-happy.png"
            alt="Professor Sharky"
            className="w-full h-auto drop-shadow-xl"
          />
        </div>

        {/* Maskot Buaya Belajar - Kiri Bawah */}
        <div className="absolute bottom-32 left-10 w-28 md:w-36 lg:w-40 hidden md:block opacity-80">
          <img
            src="/mascots/dino-book.png"
            alt="Dino Scholar"
            className="w-full h-auto drop-shadow-xl"
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DBE2EF] to-[#3F72AF]/20 text-[#112D4E] px-5 py-2.5 rounded-full text-sm font-bold mb-6 border border-[#3F72AF]/30 shadow-lg">
                <span className="w-2 h-2 bg-[#3F72AF] rounded-full animate-pulse"></span>
                QuizQuest - Platform SNBT Game #1
              </div>

              {/* Greeting for logged in users */}
              {isLoggedIn && userName && (
                <div className="mb-6 p-5 bg-gradient-to-r from-[#DBE2EF] to-[#F9F7F7] border-2 border-[#3F72AF]/40 rounded-2xl shadow-lg">
                  <p className="text-lg text-[#112D4E]">
                    👋 Selamat datang kembali,{" "}
                    <span className="font-bold bg-gradient-to-r from-[#3F72AF] to-[#112D4E] bg-clip-text text-transparent">
                      {userName}
                    </span>
                    !
                  </p>
                  <p className="text-sm text-[#3F72AF] mt-1 font-semibold">
                    Ayo lanjutkan latihanmu hari ini!
                  </p>
                </div>
              )}

              <h1 className="text-5xl md:text-6xl font-extrabold text-[#112D4E] mb-4 leading-tight drop-shadow-sm">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3F72AF] via-[#112D4E] to-[#3F72AF] animate-gradient">
                  QuizQuest
                </span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#112D4E] mb-6 leading-tight drop-shadow-sm">
                Persiapan SNBT yang Lebih Seru!
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-[#3F72AF] mb-6 leading-tight">
                Raih Skor Tertinggimu! 🎯
              </h3>
              <p className="text-xl text-[#112D4E]/80 mb-8 leading-relaxed">
                Simulasi ujian dengan timer real-time, sistem scoring otomatis,
                dan pelacakan progres yang akurat. Raih skor impianmu dengan
                latihan yang lebih efektif!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isLoggedIn ? (
                  <>
                    <Link href="/study" className="group">
                      <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white rounded-xl font-bold text-lg shadow-2xl shadow-[#3F72AF]/40 hover:shadow-[#3F72AF]/60 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-[#112D4E]/20">
                        <span>🚀</span> Mulai Latihan
                      </button>
                    </Link>
                    <Link href="/profile" className="group">
                      <button className="w-full sm:w-auto px-8 py-4 bg-[#F9F7F7] text-[#112D4E] rounded-xl font-bold text-lg border-2 border-[#3F72AF]/40 hover:border-[#3F72AF] hover:bg-[#DBE2EF] hover:text-[#112D4E] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                        <span>👤</span> Lihat Profile
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/study" className="group">
                      <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white rounded-xl font-bold text-lg shadow-2xl shadow-[#3F72AF]/40 hover:shadow-[#3F72AF]/60 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-[#112D4E]/20">
                        <span>🚀</span> Mulai Latihan Sekarang
                      </button>
                    </Link>
                    <Link href="/login" className="group">
                      <button className="w-full sm:w-auto px-8 py-4 bg-[#F9F7F7] text-[#112D4E] rounded-xl font-bold text-lg border-2 border-[#3F72AF]/40 hover:border-[#3F72AF] hover:bg-[#DBE2EF] hover:text-[#112D4E] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                        <span>👤</span> Login / Daftar
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative animate-scale-in">
              <div className="relative bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] rounded-3xl shadow-2xl p-8 border-2 border-[#3F72AF]/30">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg animate-bounce border-2 border-[#F9F7F7]">
                  ✓ Gratis!
                </div>
                <img
                  src="/logo.png"
                  alt="SNBT"
                  className="w-full h-64 object-contain mb-6"
                />
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#DBE2EF] to-[#F9F7F7] p-4 rounded-xl border border-[#3F72AF]/20 shadow-md hover:shadow-lg transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#3F72AF] to-[#112D4E] rounded-lg flex items-center justify-center text-white text-xl shadow-md">
                      ⏱️
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-[#112D4E]">
                        Real-Time Timer
                      </div>
                      <div className="text-sm text-[#3F72AF]">
                        Simulasi seperti ujian asli
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#F9F7F7] to-[#DBE2EF] p-4 rounded-xl border border-[#3F72AF]/20 shadow-md hover:shadow-lg transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-lg flex items-center justify-center text-white text-xl shadow-md">
                      📊
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-[#112D4E]">
                        Analisis Mendalam
                      </div>
                      <div className="text-sm text-[#3F72AF]">
                        Pantau progres belajarmu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white px-6 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg">
              <span>✨</span>
              Fitur Lengkap & Terbaik
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#112D4E] mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-lg sm:text-xl text-[#3F72AF] font-semibold max-w-2xl mx-auto">
              Dilengkapi dengan berbagai fitur canggih untuk mendukung persiapan
              SNBT-mu secara maksimal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {/* Game Mode */}
            <div className="group bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF]/50 to-[#F9F7F7] p-8 rounded-3xl border-2 border-[#3F72AF]/30 hover:border-[#3F72AF] hover:shadow-2xl hover:shadow-[#3F72AF]/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Mini Maskot Buaya di Corner */}
              <div className="absolute -bottom-3 -right-3 w-16 opacity-20 group-hover:opacity-25 transition-opacity">
                <img
                  src="/mascots/dino-wave.png"
                  alt="Dino"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#3F72AF] to-[#112D4E] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                🎮
              </div>
              <h3 className="text-2xl font-bold text-[#112D4E] mb-3">
                Mode Game
              </h3>
              <p className="text-[#112D4E]/70 leading-relaxed mb-4">
                Latihan dengan format game yang seru! Sistem nyawa, streak
                bonus, dan scoring dinamis untuk pengalaman belajar yang
                menyenangkan.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>❤️</span>
                  <span>Sistem Life & Streak</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>🔥</span>
                  <span>Bonus Point System</span>
                </div>
              </div>
              <div className="flex items-center text-[#3F72AF] font-bold group-hover:gap-2 transition-all">
                <span>Mulai bermain</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>

            {/* Try-Out Mode */}
            <div className="group bg-gradient-to-br from-[#DBE2EF] via-[#F9F7F7]/50 to-[#DBE2EF] p-8 rounded-3xl border-2 border-[#3F72AF]/30 hover:border-[#3F72AF] hover:shadow-2xl hover:shadow-[#3F72AF]/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Mini Maskot Hiu di Corner */}
              <div className="absolute -top-3 -right-3 w-16 opacity-20 group-hover:opacity-25 transition-opacity">
                <img
                  src="/mascots/shark-thinking.png"
                  alt="Shark Thinking"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                📝
              </div>
              <h3 className="text-2xl font-bold text-[#112D4E] mb-3">
                Mode Try-Out
              </h3>
              <p className="text-[#112D4E]/70 leading-relaxed mb-4">
                Simulasi ujian SNBT sesuai kategori: PBM, PM, PPU, PK, dan LBI.
                Latihan serius dengan format seperti ujian asli!
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>📚</span>
                  <span>5 Kategori TPS</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>✅</span>
                  <span>Format SNBT Asli</span>
                </div>
              </div>
              <div className="flex items-center text-[#3F72AF] font-bold group-hover:gap-2 transition-all">
                <span>Mulai try-out</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>

            {/* Timer Real-Time */}
            <div className="group bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF]/50 to-[#F9F7F7] p-8 rounded-3xl border-2 border-[#3F72AF]/30 hover:border-[#3F72AF] hover:shadow-2xl hover:shadow-[#3F72AF]/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3F72AF] to-[#112D4E] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                ⏱️
              </div>
              <h3 className="text-2xl font-bold text-[#112D4E] mb-3">
                Timer Real-Time
              </h3>
              <p className="text-[#112D4E]/70 leading-relaxed mb-4">
                Latihan dengan batasan waktu seperti ujian SNBT asli. Tingkatkan
                kecepatan dan ketepatan dalam mengerjakan soal!
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>⏰</span>
                  <span>Timer Countdown</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>🎯</span>
                  <span>Time Management</span>
                </div>
              </div>
              <div className="flex items-center text-[#3F72AF] font-bold group-hover:gap-2 transition-all">
                <span>Coba sekarang</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>

            {/* Analisis Performa */}
            <div className="group bg-gradient-to-br from-[#DBE2EF] via-[#F9F7F7]/50 to-[#DBE2EF] p-8 rounded-3xl border-2 border-[#3F72AF]/30 hover:border-[#3F72AF] hover:shadow-2xl hover:shadow-[#3F72AF]/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                📊
              </div>
              <h3 className="text-2xl font-bold text-[#112D4E] mb-3">
                Analisis Mendalam
              </h3>
              <p className="text-[#112D4E]/70 leading-relaxed mb-4">
                Pantau progres belajarmu dengan detail! Statistik lengkap,
                riwayat latihan, dan grafik performa untuk evaluasi optimal.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>📈</span>
                  <span>Grafik Performa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>📝</span>
                  <span>Riwayat Lengkap</span>
                </div>
              </div>
              <div className="flex items-center text-[#3F72AF] font-bold group-hover:gap-2 transition-all">
                <span>Lihat statistik</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>

            {/* Scoring System */}
            <div className="group bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF]/50 to-[#F9F7F7] p-8 rounded-3xl border-2 border-[#3F72AF]/30 hover:border-[#3F72AF] hover:shadow-2xl hover:shadow-[#3F72AF]/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Mini Maskot Buaya Membaca */}
              <div className="absolute -bottom-4 -left-4 w-20 opacity-15 group-hover:opacity-20 transition-opacity">
                <img
                  src="/mascots/dino-book.png"
                  alt="Dino Reading"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#3F72AF] to-[#112D4E] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                💯
              </div>
              <h3 className="text-2xl font-bold text-[#112D4E] mb-3">
                Sistem Scoring
              </h3>
              <p className="text-[#112D4E]/70 leading-relaxed mb-4">
                Sistem penilaian otomatis yang akurat. Dapatkan feedback
                langsung dan nilai detail setelah menyelesaikan latihan!
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>✨</span>
                  <span>Auto Scoring</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>💬</span>
                  <span>Instant Feedback</span>
                </div>
              </div>
              <div className="flex items-center text-[#3F72AF] font-bold group-hover:gap-2 transition-all">
                <span>Pelajari lebih lanjut</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="group bg-gradient-to-br from-[#DBE2EF] via-[#F9F7F7]/50 to-[#DBE2EF] p-8 rounded-3xl border-2 border-[#3F72AF]/30 hover:border-[#3F72AF] hover:shadow-2xl hover:shadow-[#3F72AF]/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Mini Maskot Hiu Senang */}
              <div className="absolute -top-4 -left-4 w-20 opacity-15 group-hover:opacity-20 transition-opacity">
                <img
                  src="/mascots/shark-happy.png"
                  alt="Happy Shark"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                🏆
              </div>
              <h3 className="text-2xl font-bold text-[#112D4E] mb-3">
                Leaderboard
              </h3>
              <p className="text-[#112D4E]/70 leading-relaxed mb-4">
                Bersaing dengan pengguna lain! Sistem ranking mingguan dengan
                update real-time untuk memotivasi belajarmu.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>🥇</span>
                  <span>Ranking Mingguan</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#3F72AF]">
                  <span>⚡</span>
                  <span>Update Real-Time</span>
                </div>
              </div>
              <div className="flex items-center text-[#3F72AF] font-bold group-hover:gap-2 transition-all">
                <span>Lihat ranking</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </div>

          {/* Additional Features Banner */}
          <div className="mt-16 bg-gradient-to-r from-[#3F72AF] via-[#112D4E] to-[#3F72AF] p-8 rounded-3xl text-white shadow-2xl">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Dan masih banyak fitur lainnya!
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl">💾</div>
                  <div className="text-sm font-semibold">Auto Save</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl">📱</div>
                  <div className="text-sm font-semibold">Responsive</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl">🔒</div>
                  <div className="text-sm font-semibold">Secure Login</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl">⚡</div>
                  <div className="text-sm font-semibold">Fast Loading</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="py-20 px-4 bg-gradient-to-br from-[#3F72AF] via-[#112D4E] to-[#3F72AF] text-white relative overflow-hidden"
      >
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#F9F7F7]/20 backdrop-blur-sm text-white px-6 py-2.5 rounded-full text-sm font-bold mb-6 border border-[#F9F7F7]/30">
              <span>🚀</span>
              Baru Diluncurkan!
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Platform Latihan SNBT Modern
            </h2>
            <p className="text-xl text-[#DBE2EF]">
              Mulai perjalanan persiapan SNBT-mu bersama kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F9F7F7]/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-[#F9F7F7]/20 hover:bg-[#F9F7F7]/20 hover:border-[#F9F7F7]/40 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-[#F9F7F7] to-[#DBE2EF] bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-xl text-[#DBE2EF]">Soal Berkualitas</div>
              <div className="mt-4 text-sm text-[#DBE2EF]/80">
                Bank soal terupdate dan terverifikasi
              </div>
            </div>

            <div className="bg-[#F9F7F7]/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-[#F9F7F7]/20 hover:bg-[#F9F7F7]/20 hover:border-[#F9F7F7]/40 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-[#F9F7F7] to-[#DBE2EF] bg-clip-text text-transparent">
                2
              </div>
              <div className="text-xl text-[#DBE2EF]">Mode Latihan</div>
              <div className="mt-4 text-sm text-[#DBE2EF]/80">
                Game Mode & Try-Out Mode
              </div>
            </div>

            <div className="bg-[#F9F7F7]/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-[#F9F7F7]/20 hover:bg-[#F9F7F7]/20 hover:border-[#F9F7F7]/40 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-[#F9F7F7] to-[#DBE2EF] bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-xl text-[#DBE2EF]">Gratis</div>
              <div className="mt-4 text-sm text-[#DBE2EF]/80">
                Semua fitur dapat diakses gratis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-[#DBE2EF] via-[#F9F7F7] to-[#DBE2EF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#112D4E] mb-4">
              🏆 Top Performers
            </h2>
            <p className="text-lg sm:text-xl text-[#3F72AF]">
              Lihat siapa yang memimpin peringkat minggu ini!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <LeaderboardCard />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#112D4E] mb-6">
            Siap Memulai Perjalananmu?
          </h2>
          <p className="text-xl text-[#3F72AF] mb-10">
            Bergabunglah dengan ribuan siswa yang telah meningkatkan persiapan
            SNBT mereka
          </p>
          <Link href="/study">
            <button className="px-12 py-5 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-[#3F72AF]/60 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#112D4E]/20">
              Mulai Latihan Gratis 🎯
            </button>
          </Link>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4">
        <Dock />
      </div>
      <Footer />
    </div>
  );
}

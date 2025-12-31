'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeaderboardCard from '@/components/LeaderboardCard';
import { getCurrentUser, getUserProfile } from '@/lib/auth/auth-helpers';

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
          setUserName(user.email.split('@')[0]);
        } else {
          setUserName('User');
        }
        
        console.log('✅ User logged in:', userName);
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                Platform Latihan UTBK #1 di Indonesia
              </div>

              {/* Greeting for logged in users */}
              {isLoggedIn && userName && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                  <p className="text-lg text-green-800">
                    👋 Selamat datang kembali, <span className="font-bold">{userName}</span>!
                  </p>
                  <p className="text-sm text-green-600 mt-1">Ayo lanjutkan latihanmu hari ini!</p>
                </div>
              )}

              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Persiapan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">UTBK</span> yang Lebih Seru!
              </h1>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Sensasi</span> Game!
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Simulasi ujian dengan timer real-time, sistem scoring otomatis, dan pelacakan progres yang akurat. Raih skor impianmu dengan latihan yang lebih efektif!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isLoggedIn ? (
                  <>
                    <Link href="/game" className="group">
                      <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <span>🚀</span> Mulai Latihan
                      </button>
                    </Link>
                    <Link href="/profile" className="group">
                      <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <span>👤</span> Lihat Profile
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/game" className="group">
                      <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <span>🚀</span> Mulai Latihan Sekarang
                      </button>
                    </Link>
                    <Link href="/login" className="group">
                      <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <span>👤</span> Login / Daftar
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative animate-scale-in">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                  ✓ Gratis!
                </div>
                <img src="/logo.png" alt="UTBK" className="w-full h-64 object-contain mb-6" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">⏱️</div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-800">Real-Time Timer</div>
                      <div className="text-sm text-slate-600">Simulasi seperti ujian asli</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-indigo-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">📊</div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-800">Analisis Mendalam</div>
                      <div className="text-sm text-slate-600">Pantau progres belajarmu</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Fitur Unggulan</h2>
            <p className="text-lg text-slate-600">Dilengkapi dengan berbagai fitur untuk mendukung persiapan UTBK-mu</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                ⏱️
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Timer Challenge</h3>
              <p className="text-slate-600 leading-relaxed">Latihan dengan batasan waktu seperti ujian UTBK asli. Tingkatkan kecepatan dan ketepatan dalam mengerjakan soal!</p>
              <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                <span>Coba sekarang</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                💯
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Score System</h3>
              <p className="text-slate-600 leading-relaxed">Sistem penilaian otomatis yang akurat. Dapatkan feedback langsung setelah menyelesaikan latihan soal!</p>
              <div className="mt-6 flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                <span>Pelajari lebih lanjut</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl border border-pink-100 hover:shadow-2xl hover:border-pink-300 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                ❤️
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Life System</h3>
              <p className="text-slate-600 leading-relaxed">Sistem nyawa membuat latihan lebih menantang. Jaga performa terbaikmu dan raih skor maksimal!</p>
              <div className="mt-6 flex items-center text-pink-600 font-semibold group-hover:gap-2 transition-all">
                <span>Mulai bermain</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Bergabung dengan Ribuan Siswa Lainnya</h2>
            <p className="text-xl text-blue-100">Platform terpercaya untuk persiapan UTBK</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-extrabold mb-2">1000+</div>
              <div className="text-xl text-blue-100">Siswa Aktif</div>
              <div className="mt-4 text-sm text-blue-200">Belajar bersama setiap hari</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-extrabold mb-2">5000+</div>
              <div className="text-xl text-blue-100">Soal Tersedia</div>
              <div className="mt-4 text-sm text-blue-200">Bank soal lengkap dan terupdate</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-extrabold mb-2">95%</div>
              <div className="text-xl text-blue-100">Tingkat Kepuasan</div>
              <div className="mt-4 text-sm text-blue-200">Rating dari pengguna kami</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">🏆 Top Performers</h2>
            <p className="text-lg sm:text-xl text-slate-600">Lihat siapa yang memimpin peringkat minggu ini!</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <LeaderboardCard />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Siap Memulai Perjalananmu?</h2>
          <p className="text-xl text-slate-600 mb-10">Bergabunglah dengan ribuan siswa yang telah meningkatkan persiapan UTBK mereka</p>
          <Link href="/game">
            <button className="px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-xl shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 hover:scale-105 active:scale-95">
              Mulai Latihan Gratis 🎯
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}     
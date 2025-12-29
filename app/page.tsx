'use client';

import Link from 'next/link';
import ButtonPrimary from '@/components/ButtonPrimary';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
        <div className="absolute -right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 h-96 w-96 animate-pulse rounded-full bg-indigo-500 opacity-20 blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <main className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12 animate-scale-in">
          <div className="mb-6 inline-block animate-float rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-1">
            <div className="rounded-full bg-gray-900 px-8 py-4">
              <span className="text-6xl">🎮</span>
            </div>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-6xl font-extrabold text-transparent drop-shadow-2xl md:text-7xl animate-slide-up">
            Game Simulasi UTBK
          </h1>
          <p className="mb-8 text-xl text-gray-200 md:text-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            🚀 Latihan UTBK Interaktif dengan Teknologi Masa Depan! 
          </p>
          <p className="text-lg text-gray-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Tingkatkan skor, kalahkan waktu, dan raih prestasi terbaikmu! ⚡
          </p>
        </div>

        {/* Buttons */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Link href="/game" className="group sm:w-auto">
            <button className="w-full transform rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 active:scale-95">
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl group-hover:animate-bounce">🚀</span>
                Mulai Petualangan
                <span className="text-2xl">✨</span>
              </span>
            </button>
          </Link>
          <Link href="/login" className="group sm:w-auto">
            <button className="w-full transform rounded-2xl border-2 border-purple-400 bg-purple-900/50 px-8 py-4 text-xl font-bold text-purple-200 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-purple-300 hover:bg-purple-800/70 active:scale-95">
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl group-hover:animate-spin">🔐</span>
                Login / Register
              </span>
            </button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-3 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="group transform rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 border border-cyan-400/30">
            <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:animate-pulse">⏱️</div>
            <h3 className="mb-3 text-xl font-bold text-cyan-300">Timer Challenge</h3>
            <p className="text-gray-300">Uji kecepatan dan ketepatan dalam hitungan detik!</p>
          </div>
          <div className="group transform rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 border border-pink-400/30">
            <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">💯</div>
            <h3 className="mb-3 text-xl font-bold text-pink-300">Score System</h3>
            <p className="text-gray-300">Raih skor tertinggi dan jadilah juara!</p>
          </div>
          <div className="group transform rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 border border-orange-400/30">
            <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:animate-bounce">❤️</div>
            <h3 className="mb-3 text-xl font-bold text-orange-300">Life System</h3>
            <p className="text-gray-300">Jaga nyawamu dan bertahan sampai akhir!</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
            <div className="text-3xl font-bold text-yellow-300">1000+</div>
            <div className="text-sm text-gray-300">Siswa Aktif</div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
            <div className="text-3xl font-bold text-green-300">5000+</div>
            <div className="text-sm text-gray-300">Soal Tersedia</div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
            <div className="text-3xl font-bold text-blue-300">99.9%</div>
            <div className="text-sm text-gray-300">Kepuasan</div>
          </div>
        </div>

      
       
      </main>
    </div>
  );
}


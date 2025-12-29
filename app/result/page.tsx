'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import ButtonPrimary from '@/components/ButtonPrimary';

function ResultContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score') || '0';
  const correct = searchParams.get('correct') || '0';
  const time = searchParams.get('time') || '0';

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} menit ${secs} detik`;
  };

  const getPerformanceMessage = (scoreNum: number) => {
    if (scoreNum >= 40) return { emoji: '🏆', text: 'Luar Biasa!', color: 'text-yellow-600' };
    if (scoreNum >= 30) return { emoji: '🎉', text: 'Bagus Sekali!', color: 'text-green-600' };
    if (scoreNum >= 20) return { emoji: '👍', text: 'Cukup Baik!', color: 'text-blue-600' };
    return { emoji: '💪', text: 'Terus Berlatih!', color: 'text-gray-600' };
  };

  const scoreNum = parseInt(score);
  const performance = getPerformanceMessage(scoreNum);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-yellow-500 opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-pink-500 opacity-20 blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 animate-pulse rounded-full bg-purple-500 opacity-20 blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Confetti Effect */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.7,
            }}
          >
            {['🎉', '⭐', '🏆', '💫', '✨', '🎊'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-3xl animate-scale-in">
          <div className="rounded-3xl bg-white/10 p-1 backdrop-blur-xl animate-pulse-glow">
            <div className="rounded-3xl bg-gray-900/80 p-10 backdrop-blur-xl">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mb-6 inline-block animate-bounce">
                  <div className="text-8xl">{performance.emoji}</div>
                </div>
                <h1 className={`mb-4 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl`}>
                  {performance.text}
                </h1>
                <p className="text-xl text-gray-300">Kamu telah menyelesaikan tantangan!</p>
              </div>

              {/* Score Display */}
              <div className="mb-10 animate-slide-up rounded-3xl bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 p-1 shadow-2xl" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-3xl bg-gray-900/90 p-10 text-center backdrop-blur-xl">
                  <p className="mb-3 text-xl font-medium text-yellow-300">🏆 Skor Akhir 🏆</p>
                  <p className="animate-pulse text-7xl font-extrabold text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text md:text-8xl">
                    {score}
                  </p>
                </div>
              </div>

              {/* Statistics */}
              <div className="mb-10 grid gap-6 sm:grid-cols-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="group transform rounded-2xl bg-gradient-to-br from-green-600/30 to-emerald-600/30 p-6 text-center backdrop-blur-sm transition-all hover:scale-105 border border-green-400/30">
                  <div className="mb-3 text-5xl transition-transform group-hover:scale-125 group-hover:animate-bounce">✅</div>
                  <p className="text-4xl font-bold text-green-300">{correct}</p>
                  <p className="text-sm text-gray-300">Jawaban Benar</p>
                </div>
                <div className="group transform rounded-2xl bg-gradient-to-br from-red-600/30 to-pink-600/30 p-6 text-center backdrop-blur-sm transition-all hover:scale-105 border border-red-400/30">
                  <div className="mb-3 text-5xl transition-transform group-hover:scale-125 group-hover:rotate-12">❌</div>
                  <p className="text-4xl font-bold text-red-300">{5 - parseInt(correct)}</p>
                  <p className="text-sm text-gray-300">Jawaban Salah</p>
                </div>
                <div className="group transform rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-600/30 p-6 text-center backdrop-blur-sm transition-all hover:scale-105 border border-blue-400/30">
                  <div className="mb-3 text-5xl transition-transform group-hover:scale-125 group-hover:animate-spin">⏱️</div>
                  <p className="text-xl font-bold text-blue-300">{formatTime(parseInt(time))}</p>
                  <p className="text-sm text-gray-300">Waktu</p>
                </div>
              </div>

              {/* Performance Tips */}
              <div className="mb-10 rounded-2xl bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-6 backdrop-blur-sm border border-yellow-400/30 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-yellow-300">
                  <span className="text-2xl">💡</span>
                  Tips untuk Skor Lebih Tinggi:
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🎯</span>
                    <span>Latihan rutin meningkatkan kecepatan dan akurasi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📚</span>
                    <span>Pahami konsep dasar sebelum mengerjakan soal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">⚡</span>
                    <span>Kelola waktu dengan baik saat ujian</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <Link href="/game" className="flex-1">
                  <button className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-5 text-xl font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-green-500/50 active:scale-95">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span className="text-2xl transition-transform group-hover:animate-bounce">🎮</span>
                      <span>Main Lagi</span>
                    </span>
                    <div className="absolute inset-0 shimmer"></div>
                  </button>
                </Link>
                <Link href="/" className="flex-1">
                  <button className="group w-full rounded-2xl border-2 border-purple-400 bg-purple-900/50 px-8 py-5 text-xl font-bold text-purple-200 backdrop-blur-sm transition-all hover:scale-105 hover:border-purple-300 hover:bg-purple-800/70 active:scale-95">
                    <span className="flex items-center justify-center gap-3">
                      <span className="text-2xl transition-transform group-hover:-translate-x-1">🏠</span>
                      <span>Kembali ke Beranda</span>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
        <div className="text-2xl">Loading...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}

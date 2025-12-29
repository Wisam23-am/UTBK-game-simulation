'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Home, RotateCcw } from 'lucide-react';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0');
  const correct = parseInt(searchParams.get('correct') || '0');
  const time = parseInt(searchParams.get('time') || '0');
  
  const totalQuestions = 5; // Sesuaikan dengan jumlah soal di game
  const percentage = (correct / totalQuestions) * 100;
  
  // Tentukan grade berdasarkan skor
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', label: 'Sempurna!', color: '#3F72AF' };
    if (percentage >= 80) return { grade: 'A', label: 'Luar Biasa!', color: '#3F72AF' };
    if (percentage >= 70) return { grade: 'B', label: 'Bagus!', color: '#3F72AF' };
    if (percentage >= 60) return { grade: 'C', label: 'Cukup', color: '#3F72AF' };
    return { grade: 'D', label: 'Astagfirullah', color: '#112D4E' };
  };

  const gradeInfo = getGrade();
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF] to-[#3F72AF] p-4">
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
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Score */}
              <div className="rounded-2xl bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]/20 p-6 border border-[#3F72AF]/30 text-center">
                <div className="text-sm text-[#3F72AF] font-semibold mb-2">Skor Total</div>
                <div className="text-4xl font-bold text-[#112D4E]">{score}</div>
                <div className="text-xs text-[#3F72AF] mt-1">poin</div>
              </div>

              {/* Correct Answers */}
              <div className="rounded-2xl bg-gradient-to-br from-[#3F72AF]/20 to-[#DBE2EF] p-6 border border-[#3F72AF]/30 text-center">
                <div className="text-sm text-[#3F72AF] font-semibold mb-2">Jawaban Benar</div>
                <div className="text-4xl font-bold text-[#112D4E]">{correct}</div>
                <div className="text-xs text-[#3F72AF] mt-1">soal</div>
              </div>

              {/* Time */}
              <div className="rounded-2xl bg-gradient-to-br from-[#DBE2EF] to-[#3F72AF]/20 p-6 border border-[#3F72AF]/30 text-center">
                <div className="text-sm text-[#3F72AF] font-semibold mb-2">Waktu</div>
                <div className="text-4xl font-bold text-[#112D4E]">
                  {minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`}
                </div>
                <div className="text-xs text-[#3F72AF] mt-1">menit</div>
              </div>
            </div>  

            {/* Performance Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-[#112D4E]">Performa Anda</span>
                <span className="text-sm font-bold text-[#3F72AF]">{percentage.toFixed(1)}%</span>
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
                {percentage >= 90
                  ? 'Luar biasa! Anda sudah menguasai materi dengan sangat baik. Terus pertahankan performa ini!'
                  : percentage >= 80
                  ? 'Sangat bagus! Anda memahami sebagian besar materi. Pelajari kembali soal yang salah.'
                  : percentage >= 70
                  ? 'Bagus! Anda sudah memahami materi dengan cukup baik. Ada beberapa area yang perlu diperbaiki.'
                  : percentage >= 60
                  ? 'Al-Quran berulang kali bertanya, Afala Taqilun? (Apakah kamu tidak menggunakan akalmu?). Namun, Anda sepertinya telah mencapai tingkat \'spiritualitas\' yang sangat tinggi, di mana Anda merasa tidak lagi memiliki nalar untuk memahami dunia.'
                  : 'Al-Qur\'an berulang kali bertanya, Afala Taqilun? (Apakah kamu tidak menggunakan akalmu?). Namun, Anda sepertinya telah mencapai tingkat \'spiritualitas\' yang sangat tinggi, di mana Anda merasa tidak lagi memiliki nalar untuk memahami dunia.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/result" className="block">
                <button className="w-full py-4 px-6 bg-[#DBE2EF] hover:bg-[#3F72AF]/20 text-[#3F72AF] font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-[#3F72AF]/30">
                  <Home size={20} />
                  <span>Ke Beranda</span>
                </button>
              </Link>
              <Link href="/game" className="block">
                <button className="w-full py-4 px-6 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] hover:from-[#112D4E] hover:to-[#3F72AF] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#3F72AF]/50">
                  <RotateCcw size={20} />
                  <span>Coba Lagi</span>
                </button>
              </Link>
            </div>

            {/* Bottom Message */}
            <div className="mt-8 pt-6 border-t border-[#3F72AF]/20 text-center">
              <p className="text-xs text-[#3F72AF]/70">
                ✨ Setiap latihan membawamu lebih dekat ke kesuksesan UTBK
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#112D4E] via-[#112D4E] to-[#3F72AF] text-white py-12 px-4 pb-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#3F72AF]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DBE2EF]/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3F72AF] to-[#112D4E] flex items-center justify-center shadow-lg">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F9F7F7] to-[#DBE2EF]">
                  QuizQuest
                </span>
                <span className="text-xs text-[#DBE2EF]/80 -mt-1">
                  SNBT Game Platform
                </span>
              </div>
            </div>
            <p className="text-[#DBE2EF] text-sm leading-relaxed mb-4">
              Platform pembelajaran interaktif untuk persiapan SNBT terbaik.
              Latih kemampuanmu dan raih skor impian!
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs">
              <span className="px-3 py-1 bg-[#3F72AF]/30 rounded-full border border-[#DBE2EF]/20">
                🎮 Game Mode
              </span>
              <span className="px-3 py-1 bg-[#3F72AF]/30 rounded-full border border-[#DBE2EF]/20">
                📝 Try-Out
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#F9F7F7] to-[#DBE2EF]">
              Tentang Kami
            </h3>
            <div className="space-y-3 text-sm text-[#DBE2EF]">
              <p className="leading-relaxed">
                Dikembangkan oleh mahasiswa PENS alumni SMAPA sebagai platform
                edukasi gratis untuk membantu persiapan SNBT siswa-siswi SMAPA.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#3F72AF]/20 px-4 py-2 rounded-lg border border-[#DBE2EF]/20">
                <span>🎓</span>
                <span className="font-semibold">PENS X SMAPA</span>
              </div>
              <div className="mt-4">
                <Link href="/feedback">
                  <button className="px-4 py-2 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white rounded-lg font-semibold hover:scale-105 transition-all text-xs">
                    💬 Kirim Feedback
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#DBE2EF]/20 pt-6">
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#DBE2EF]/80 text-sm text-center md:text-left">
              © 2026 Game Simulasi SNBT By PENS X SMAPA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

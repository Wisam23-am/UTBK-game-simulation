'use client';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 pb-24">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-2xl font-bold">UTBK Simulator</span>
        </div>
        <p className="text-slate-400 mb-6">Platform pembelajaran interaktif untuk persiapan UTBK terbaik</p>
        <div className="border-t border-slate-800 pt-6">
          <p className="text-slate-500 text-sm">© 2025 Game Simulasi UTBK By PENS X SMAPA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

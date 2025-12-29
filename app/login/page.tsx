'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import ButtonPrimary from '@/components/ButtonPrimary';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static UI - no real authentication
    console.log('Login attempt:', { email, password });
    alert('Login successful! (Demo only)');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 opacity-20 blur-3xl" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white opacity-40"
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
        <div className="w-full max-w-md animate-scale-in">
          {/* Glowing Card */}
          <div className="rounded-3xl bg-white/10 p-1 backdrop-blur-xl animate-pulse-glow">
            <div className="rounded-3xl bg-gray-900/80 p-8 backdrop-blur-xl">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mb-4 inline-block animate-float">
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                    <div className="rounded-full bg-gray-900 p-4">
                      <span className="text-5xl">🔐</span>
                    </div>
                  </div>
                </div>
                <h1 className="mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-extrabold text-transparent">
                  Selamat Datang!
                </h1>
                <p className="text-gray-300">Masuk untuk melanjutkan petualanganmu</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="group">
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-300">
                    📧 Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-2 border-purple-500/30 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/30 group-hover:border-purple-500/50"
                    placeholder="nama@email.com"
                    required
                  />
                </div>

                <div className="group">
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-300">
                    🔒 Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border-2 border-purple-500/30 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/30 group-hover:border-purple-500/50"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Masuk</span>
                    <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </span>
                  <div className="absolute inset-0 shimmer"></div>
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Belum punya akun?{' '}
                  <Link href="/register" className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 transition-all duration-300">
                    Daftar sekarang ✨
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <Link href="/" className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-300">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  Kembali ke beranda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

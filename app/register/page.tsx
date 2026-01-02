'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Dock from '@/components/Dock';
import { signUpAction } from '@/lib/auth/auth-actions';
import { DEV_MODE } from '@/lib/auth/auth-helpers';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // In dev mode, skip registration
      if (DEV_MODE) {
        console.log('🔧 DEV MODE: Skipping registration');
        router.push('/');
        return;
      }

      // Generate username from name or email if not provided
      const finalUsername = username || name.toLowerCase().replace(/\s+/g, '') || email.split('@')[0];

      const { user, error: authError } = await signUpAction(
        email,
        password,
        finalUsername,
        name
      );

      if (authError) {
        setError(authError);
        setIsLoading(false);
        return;
      }

      if (user) {
        // Success - redirect to home
        alert('Pendaftaran berhasil! Silakan login.');
        router.push('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFEE91] via-[#F5C857] to-[#E2852E] p-4 pb-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#E2852E] opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-[#ABE0F0] opacity-30 blur-3xl" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#E2852E] opacity-40"
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
          {/* Dev Mode Badge */}
          {DEV_MODE && (
            <div className="mb-4 rounded-lg bg-yellow-500/20 border border-yellow-500/50 p-3 text-center text-yellow-800 backdrop-blur-sm">
              🔧 <strong>DEV MODE</strong> - Auth disabled
            </div>
          )}

          {/* Glowing Card */}
          <div className="rounded-3xl bg-white/20 p-1 backdrop-blur-xl shadow-2xl">
            <div className="rounded-3xl bg-white/95 p-8 backdrop-blur-xl">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mb-4 inline-block animate-float">
                  <div className="rounded-full bg-gradient-to-r from-[#E2852E] to-[#F5C857] p-1">
                    <div className="rounded-full bg-white p-4">
                      <span className="text-5xl">🚀</span>
                    </div>
                  </div>
                </div>
                <h1 className="mb-3 bg-gradient-to-r from-[#E2852E] to-[#F5C857] bg-clip-text text-4xl font-extrabold text-transparent">
                  Bergabunglah!
                </h1>
                <p className="text-[#E2852E] font-medium">Mulai petualangan belajarmu sekarang</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500 p-3 text-red-700 text-sm">
                  ⚠️ {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="group">
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#E2852E]">
                    👤 Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border-2 border-[#F5C857] bg-[#FFEE91]/30 px-4 py-3 text-[#E2852E] placeholder-[#E2852E]/50 backdrop-blur-sm transition-all duration-300 focus:border-[#E2852E] focus:outline-none focus:ring-4 focus:ring-[#E2852E]/30"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="group">
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#E2852E]">
                    📧 Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-2 border-[#F5C857] bg-[#FFEE91]/30 px-4 py-3 text-[#E2852E] placeholder-[#E2852E]/50 backdrop-blur-sm transition-all duration-300 focus:border-[#E2852E] focus:outline-none focus:ring-4 focus:ring-[#E2852E]/30"
                    placeholder="nama@email.com"
                    required
                  />
                </div>

                <div className="group">
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#E2852E]">
                    🔒 Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border-2 border-[#F5C857] bg-[#FFEE91]/30 px-4 py-3 text-[#E2852E] placeholder-[#E2852E]/50 backdrop-blur-sm transition-all duration-300 focus:border-[#E2852E] focus:outline-none focus:ring-4 focus:ring-[#E2852E]/30"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <p className="mt-1 text-xs text-[#E2852E]/70">Minimal 6 karakter</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#E2852E] to-[#F5C857] px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[#E2852E]/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                    {isLoading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <span className="transition-transform duration-300 group-hover:rotate-12">🎉</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">Daftar Sekarang</span>
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-[#E2852E]">
                  Sudah punya akun?{' '}
                  <Link href="/login" className="font-bold text-[#E2852E] hover:text-[#F5C857] transition-all duration-300 underline">
                    Masuk sekarang →
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <Link href="/" className="group inline-flex items-center gap-2 text-sm text-[#E2852E]/70 transition-colors hover:text-[#E2852E]">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  Kembali ke beranda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4">
        <Dock />
      </div>
    </div>
  );
}

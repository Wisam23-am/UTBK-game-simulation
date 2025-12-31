'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/auth/auth-actions';

const App = () => {
  const router = useRouter();
  const [view, setView] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (view === 'login') {
        // Login with Supabase
        const { error: signInError } = await signIn(formData.email, formData.password);
        
        if (signInError) {
          setError(signInError || 'Email atau password salah. Silakan coba lagi.');
          setIsLoading(false);
          return;
        }

        // Success - redirect to home
        router.push('/');
      } else {
        // Register with Supabase
        // Validate password match
        if (formData.password !== formData.confirmPassword) {
          setError('Password tidak cocok!');
          setIsLoading(false);
          return;
        }

        // Validate password length
        if (formData.password.length < 6) {
          setError('Password minimal 6 karakter!');
          setIsLoading(false);
          return;
        }

        // Validate username
        if (!formData.username.trim()) {
          setError('Username wajib diisi!');
          setIsLoading(false);
          return;
        }

        const { error: signUpError } = await signUp(
          formData.email,
          formData.password,
          formData.username
        );

        if (signUpError) {
          setError(signUpError || 'Gagal mendaftar. Silakan coba lagi.');
          setIsLoading(false);
          return;
        }

        // Success - show message and redirect
        alert('Pendaftaran berhasil! Silakan login.');
        setView('login');
        setFormData({ email: formData.email, password: '', username: '', confirmPassword: '' });
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const toggleView = () => {
    setView(view === 'login' ? 'register' : 'login');
    setFormData({ email: '', password: '', username: '', confirmPassword: '' });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans text-slate-800">
      {/* Container Utama */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header/Logo Section */}
        <div className="pt-10 pb-6 flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-2xl flex items-center justify-center mb-4 shadow-lg overflow-hidden group cursor-pointer bg-white border-2 border-gray-200 hover:border-blue-400 transition-all">
            <img 
              src="/logo.png" 
              alt="Default Logo" 
              className="w-full h-full object-contain p-2"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {view === 'login' ? 'Selamat Datang ' : 'Buat Akun Baru'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {view === 'login' ? 'Masuk untuk memulai simulasi UTBK' : 'Lengkapi data diri untuk berjuang bersama'}
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-5">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 animate-shake">
              ⚠️ {error}
            </div>
          )}

          {view === 'register' && (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Masukkan username"
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  onChange={handleInputChange}
                  value={formData.username}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                required
                placeholder="email@contoh.com"
                className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-gray-700">Kata Sandi</label>
              {view === 'login' && (
                <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-700">
                  Lupa Kata Sandi?
                </button>
              )}
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                className="block w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                onChange={handleInputChange}
                value={formData.password}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {view === 'register' && (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Konfirmasi Kata Sandi</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Ulangi kata sandi"
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                />
              </div>
            </div>
          )}

          {/* Tombol Aksi Utama */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{view === 'login' ? 'Masuk Sekarang' : 'Daftar Akun'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Toggle Login/Register */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              {view === 'login' ? 'Belum punya akun?' : 'Sudah memiliki akun?'}
              <button
                type="button"
                onClick={toggleView}
                className="ml-1 font-bold text-blue-600 hover:underline transition-all"
              >
                {view === 'login' ? 'Daftar' : 'Masuk'}
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Footer Filosofis */}
      <footer className="mt-8 text-center max-w-sm px-4">
        <p className="text-xs text-gray-400 leading-relaxed italic">
          "Barang siapa yang menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga." (HR. Muslim)
        </p>
      </footer>
    </div>
  );
};

export default App;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/auth-actions";

const App = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Login with Supabase
      const { error: signInError } = await signIn(
        formData.email,
        formData.password
      );

      if (signInError) {
        setError(
          signInError || "Email atau password salah. Silakan coba lagi."
        );
        setIsLoading(false);
        return;
      }

      // Success - redirect to home
      router.push("/");
    } catch (err) {
      console.error("Auth error:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF] to-[#3F72AF]/20 flex flex-col justify-center items-center p-4 font-sans relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#3F72AF]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#112D4E]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-[#DBE2EF]/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Container Utama */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] rounded-3xl shadow-2xl overflow-hidden border-2 border-[#3F72AF]/40">
        {/* Header/Logo Section */}
        <div className="bg-gradient-to-r from-[#3F72AF] via-[#112D4E] to-[#3F72AF] pt-10 pb-6 flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-2xl flex items-center justify-center mb-4 shadow-xl overflow-hidden bg-white border-4 border-[#F9F7F7]/50">
            <img
              src="/logo.png"
              alt="QuizQuest Logo"
              className="w-full h-full object-contain p-2"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">
            Selamat Datang di QuizQuest
          </h1>
          <p className="text-[#DBE2EF] text-sm mt-1">
            Masuk untuk memulai simulasi SNBT
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-5 pt-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-600 animate-shake">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#112D4E] ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3F72AF]/60 group-focus-within:text-[#3F72AF] transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                required
                placeholder="email@contoh.com"
                className="block w-full pl-10 pr-3 py-3 bg-white border-2 border-[#3F72AF]/30 rounded-xl focus:ring-4 focus:ring-[#3F72AF]/20 focus:border-[#3F72AF] outline-none transition-all text-sm text-[#112D4E]"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-[#112D4E]">
                Kata Sandi
              </label>
              <button
                type="button"
                className="text-xs font-medium text-[#3F72AF] hover:text-[#112D4E]"
              >
                Lupa Kata Sandi?
              </button>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3F72AF]/60 group-focus-within:text-[#3F72AF] transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="block w-full pl-10 pr-12 py-3 bg-white border-2 border-[#3F72AF]/30 rounded-xl focus:ring-4 focus:ring-[#3F72AF]/20 focus:border-[#3F72AF] outline-none transition-all text-sm text-[#112D4E]"
                onChange={handleInputChange}
                value={formData.password}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#3F72AF]/60 hover:text-[#3F72AF]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Tombol Aksi Utama */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 px-4 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] hover:from-[#112D4E] hover:to-[#3F72AF] text-white font-bold rounded-xl shadow-2xl flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98] hover:scale-105 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Link to Register */}
          <div className="text-center mt-6">
            <p className="text-sm text-[#112D4E]/70">
              Belum punya akun?
              <Link
                href="/register"
                className="ml-1 font-bold text-[#3F72AF] hover:text-[#112D4E] hover:underline transition-all"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Footer Filosofis */}
      <footer className="relative mt-8 text-center max-w-sm px-4">
        <p className="text-xs text-[#112D4E]/60 leading-relaxed italic">
          "Barang siapa yang menempuh jalan untuk mencari ilmu, maka Allah akan
          mudahkan baginya jalan menuju surga." (HR. Muslim)
        </p>
      </footer>
    </div>
  );
};

export default App;

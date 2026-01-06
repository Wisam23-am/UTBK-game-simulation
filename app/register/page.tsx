"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth/auth-actions";
import { universities, searchUniversities } from "@/lib/data/universities";
import { schools } from "@/lib/data/schools";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    school: "",
    targetUniversity: "",
    confirmPassword: "",
  });
  const [universityOptions, setUniversityOptions] =
    useState<string[]>(universities);
  const [universitySearch, setUniversitySearch] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<{
    isValid: boolean;
    hasMinLength: boolean;
    hasLetter: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  }>({
    isValid: false,
    hasMinLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Handle university search/filter with debounce
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (universitySearch.length >= 2) {
        const filtered = await searchUniversities(universitySearch);
        setUniversityOptions(filtered);
      } else {
        setUniversityOptions(universities.slice(0, 100)); // Show top 100
      }
    }, 300); // Debounce 300ms

    return () => clearTimeout(delaySearch);
  }, [universitySearch]);

  // Validate password strength
  const validatePassword = (pwd: string) => {
    const minLength = pwd.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
    const isValid = minLength && hasLetter && hasNumber && hasSpecialChar;

    setPasswordStrength({
      isValid,
      hasMinLength: minLength,
      hasLetter,
      hasNumber,
      hasSpecialChar,
    });

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        setError("Password tidak cocok!");
        setIsLoading(false);
        return;
      }

      // Validate password strength
      if (!validatePassword(formData.password)) {
        setError("Password harus memenuhi semua kriteria yang ditentukan!");
        setIsLoading(false);
        return;
      }

      // Validate full name
      if (!formData.fullName.trim()) {
        setError("Nama lengkap wajib diisi!");
        setIsLoading(false);
        return;
      }

      const { error: signUpError } = await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        formData.school,
        formData.targetUniversity
      );

      if (signUpError) {
        // Check if email already registered
        if (
          signUpError.includes("already registered") ||
          signUpError.includes("already exists")
        ) {
          setError(
            "Email ini sudah terdaftar! Silakan login atau gunakan email lain."
          );
        } else {
          setError(signUpError || "Gagal mendaftar. Silakan coba lagi.");
        }
        setIsLoading(false);
        return;
      }

      // Success - show message and redirect
      alert(
        "Pendaftaran berhasil! 📧\n\nSilakan cek email Anda untuk verifikasi akun.\nSetelah verifikasi, Anda dapat login menggunakan akun yang telah didaftarkan.\n\nJika tidak ada email, cek folder spam/junk."
      );
      router.push("/login");
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
    // Validate password strength on change
    if (name === "password") {
      validatePassword(value);
    }
    // Update university search when university field changes
    if (name === "targetUniversity") {
      setUniversitySearch(value);
    }
    // Clear error when user starts typing
    if (error) setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF] to-[#3F72AF]/20 flex flex-col justify-center items-center p-4 font-sans relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#3F72AF]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#112D4E]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#DBE2EF]/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

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
            Bergabung dengan QuizQuest
          </h1>
          <p className="text-[#DBE2EF] text-sm mt-1">
            Mulai perjalanan menuju kampus impian
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
              Nama Lengkap
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3F72AF]/60 group-focus-within:text-[#3F72AF] transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Masukkan nama lengkap"
                className="block w-full pl-10 pr-3 py-3 bg-white border-2 border-[#3F72AF]/30 rounded-xl focus:ring-4 focus:ring-[#3F72AF]/20 focus:border-[#3F72AF] outline-none transition-all text-sm text-[#112D4E]"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </div>
          </div>

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
            <label className="text-sm font-semibold text-[#112D4E] ml-1">
              Kata Sandi
            </label>
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
            {/* Password Strength Indicator */}
            <div className="mt-3 space-y-2 rounded-lg bg-white border-2 border-[#3F72AF]/20 p-4 text-xs">
              <p className="font-bold text-[#112D4E] mb-3 text-sm">
                Persyaratan Password:
              </p>
              <div className="space-y-2">
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    passwordStrength.hasMinLength
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  <span className="font-bold text-base">
                    {passwordStrength.hasMinLength ? "✓" : "✗"}
                  </span>
                  <span className="font-medium">Minimal 8 karakter</span>
                </div>
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    passwordStrength.hasLetter
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  <span className="font-bold text-base">
                    {passwordStrength.hasLetter ? "✓" : "✗"}
                  </span>
                  <span className="font-medium">Minimal 1 huruf</span>
                </div>
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    passwordStrength.hasNumber
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  <span className="font-bold text-base">
                    {passwordStrength.hasNumber ? "✓" : "✗"}
                  </span>
                  <span className="font-medium">Minimal 1 angka</span>
                </div>
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    passwordStrength.hasSpecialChar
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  <span className="font-bold text-base">
                    {passwordStrength.hasSpecialChar ? "✓" : "✗"}
                  </span>
                  <span className="font-medium">
                    Minimal 1 tanda khusus (!@#$%^&*)
                  </span>
                </div>
              </div>
              {passwordStrength.isValid && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-green-700 border-2 border-green-300">
                  <span>🎉</span>
                  <span className="font-bold">Password kuat dan aman!</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#112D4E] ml-1">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3F72AF]/60 group-focus-within:text-[#3F72AF] transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Ulangi kata sandi"
                className="block w-full pl-10 pr-12 py-3 bg-white border-2 border-[#3F72AF]/30 rounded-xl focus:ring-4 focus:ring-[#3F72AF]/20 focus:border-[#3F72AF] outline-none transition-all text-sm text-[#112D4E]"
                onChange={handleInputChange}
                value={formData.confirmPassword}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#3F72AF]/60 hover:text-[#3F72AF]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#112D4E] ml-1">
              Asal Sekolah
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3F72AF]/60 group-focus-within:text-[#3F72AF] transition-colors">
                <span className="text-lg">🏫</span>
              </div>
              <input
                type="text"
                name="school"
                list="schools-datalist"
                placeholder="Ketik nama sekolah (opsional)"
                className="block w-full pl-10 pr-3 py-3 bg-white border-2 border-[#3F72AF]/30 rounded-xl focus:ring-4 focus:ring-[#3F72AF]/20 focus:border-[#3F72AF] outline-none transition-all text-sm text-[#112D4E]"
                onChange={handleInputChange}
                value={formData.school}
              />
              <datalist id="schools-datalist">
                {schools.map((school) => (
                  <option key={school} value={school} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#112D4E] ml-1">
              Kampus Impian
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3F72AF]/60 group-focus-within:text-[#3F72AF] transition-colors">
                <span className="text-lg">🏛️</span>
              </div>
              <input
                type="text"
                name="targetUniversity"
                list="universities-datalist"
                placeholder="🎓 Ketik untuk mencari dari 4400+ perguruan tinggi di Indonesia"
                className="block w-full pl-10 pr-3 py-3 bg-white border-2 border-[#3F72AF]/30 rounded-xl focus:ring-4 focus:ring-[#3F72AF]/20 focus:border-[#3F72AF] outline-none transition-all text-sm text-[#112D4E]"
                onChange={handleInputChange}
                value={formData.targetUniversity}
              />
              <datalist id="universities-datalist">
                {universityOptions.map((uni) => (
                  <option key={uni} value={uni} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Tombol Aksi Utama */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 px-4 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] hover:from-[#112D4E] hover:to-[#3F72AF] text-white font-bold rounded-xl shadow-2xl shadow-[#3F72AF]/30 flex items-center justify-center space-x-2 transition-all transform hover:scale-105 active:scale-[0.98] ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Daftar Akun</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Link to Login */}
          <div className="text-center mt-6">
            <p className="text-sm text-[#112D4E]/70">
              Sudah memiliki akun?
              <Link
                href="/login"
                className="ml-1 font-bold text-[#3F72AF] hover:text-[#112D4E] transition-all"
              >
                Masuk
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Footer Filosofis */}
      <footer className="mt-8 text-center max-w-sm px-4">
        <p className="text-xs text-[#112D4E]/60 leading-relaxed italic">
          "Barang siapa yang menempuh jalan untuk mencari ilmu, maka Allah akan
          mudahkan baginya jalan menuju surga." (HR. Muslim)
        </p>
      </footer>
    </div>
  );
};

export default RegisterPage;

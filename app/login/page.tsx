'use client';

// import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import ButtonPrimary from '@/components/ButtonPrimary';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Static UI - no real authentication
//     console.log('Login attempt:', { email, password });
//     alert('Login successful! (Demo only)');
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
//         <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 opacity-20 blur-3xl" style={{ animationDelay: '1.5s' }}></div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute inset-0">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute h-1 w-1 rounded-full bg-white opacity-40"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 2}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="relative z-10 flex min-h-screen items-center justify-center">
//         <div className="w-full max-w-md animate-scale-in">
//           {/* Glowing Card */}
//           <div className="rounded-3xl bg-white/10 p-1 backdrop-blur-xl animate-pulse-glow">
//             <div className="rounded-3xl bg-gray-900/80 p-8 backdrop-blur-xl">
//               {/* Header */}
//               <div className="mb-8 text-center">
//                 <div className="mb-4 inline-block animate-float">
//                   <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
//                     <div className="rounded-full bg-gray-900 p-4">
//                       <span className="text-5xl">🔐</span>
//                     </div>
//                   </div>
//                 </div>
//                 <h1 className="mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-extrabold text-transparent">
//                   Selamat Datang!
//                 </h1>
//                 <p className="text-gray-300">Masuk untuk melanjutkan petualanganmu</p>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="group">
//                   <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-300">
//                     📧 Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full rounded-xl border-2 border-purple-500/30 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/30 group-hover:border-purple-500/50"
//                     placeholder="nama@email.com"
//                     required
//                   />
//                 </div>

//                 <div className="group">
//                   <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-300">
//                     🔒 Password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full rounded-xl border-2 border-purple-500/30 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/30 group-hover:border-purple-500/50"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 active:scale-95"
//                 >
//                   <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
//                     <span className="transition-transform duration-300 group-hover:translate-x-1">Masuk</span>
//                     <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">→</span>
//                   </span>
//                   <div className="absolute inset-0 shimmer"></div>
//                 </button>
//               </form>

//               {/* Footer Links */}
//               <div className="mt-8 text-center">
//                 <p className="text-gray-400">
//                   Belum punya akun?{' '}
//                   <Link href="/register" className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 transition-all duration-300">
//                     Daftar sekarang ✨
//                   </Link>
//                 </p>
//               </div>

//               <div className="mt-4 text-center">
//                 <Link href="/" className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-300">
//                   <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
//                   Kembali ke beranda
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  // Simulasi penanganan form
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Logika simulasi: Dalam pencarian ilmu, kesabaran adalah kunci.
    setTimeout(() => {
      setIsLoading(false);
      const message = view === 'login' 
        ? "Bismillah, Anda berhasil masuk ke simulasi." 
        : "Alhamdulillah, akun Anda telah terdaftar.";
      alert(message);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleView = () => {
    setView(view === 'login' ? 'register' : 'login');
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
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
            {/* {logoImage ? (
              <img src={logoImage} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='95' fill='white' stroke='%231e40af' stroke-width='2'/%3E%3Ctext x='50%25' y='50%25' font-size='60' font-weight='bold' text-anchor='middle' dy='0.3em' fill='%231e40af'%3EPENS%3C/text%3E%3C/svg%3E" 
                alt="Default Logo" 
                className="w-full h-full object-contain p-2"
              />
            )}
            {/* Overlay untuk upload 
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <span className="text-white text-xs font-bold text-center px-2">
                {logoImage ? '🖼️ Ubah Logo' : '📤 Upload Logo'}
              </span>
            </label> */}
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
          
          {view === 'register' && (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Nama Lengkap</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Masukkan nama lengkap"
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  onChange={handleInputChange}
                  value={formData.name}
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
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    // Cek status login
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/login');
      return;
    }

    const name = localStorage.getItem('userName') || 'User';
    const email = localStorage.getItem('userEmail') || 'user@example.com';
    setIsLoggedIn(loggedIn);
    setUserName(name);
    setUserEmail(email);
    setEditedName(name);
  }, [router]);

  const handleSaveProfile = () => {
    if (editedName.trim()) {
      localStorage.setItem('userName', editedName);
      setUserName(editedName);
      setIsEditing(false);
      alert('Profil berhasil diperbarui!');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Profil <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pengguna</span>
          </h1>
          <p className="text-lg text-slate-600">Kelola informasi akun Anda</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in">
          {/* Header dengan Avatar */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
            <div className="inline-block">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-5xl shadow-xl">
                {getInitials(userName)}
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">{userName}</h2>
            <p className="mt-2 text-blue-100">{userEmail}</p>
          </div>

          {/* Profile Info */}
          <div className="p-8 space-y-6">
            {/* Nama */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-slate-800 font-medium">
                  {userName}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-slate-800 font-medium">
                {userEmail}
              </div>
              <p className="mt-2 text-xs text-slate-500">Email tidak dapat diubah</p>
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 text-center">
                <div className="text-3xl font-bold text-blue-600">0</div>
                <div className="text-sm text-slate-600 mt-1">Latihan</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 text-center">
                <div className="text-3xl font-bold text-indigo-600">0</div>
                <div className="text-sm text-slate-600 mt-1">Skor Rata-rata</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100 text-center">
                <div className="text-3xl font-bold text-purple-600">-</div>
                <div className="text-sm text-slate-600 mt-1">Peringkat</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    💾 Simpan Perubahan
                  </button>
                  <button
                    onClick={() => {
                      setEditedName(userName);
                      setIsEditing(false);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-200 text-slate-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    ❌ Batal
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  ✏️ Edit Profil
                </button>
              )}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Link href="/game">
                <button className="w-full px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 active:scale-95">
                  🎮 Mulai Latihan
                </button>
              </Link>
              <Link href="/leaderboard">
                <button className="w-full px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 hover:scale-105 active:scale-95">
                  🏆 Leaderboard
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              Kembali ke Beranda
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

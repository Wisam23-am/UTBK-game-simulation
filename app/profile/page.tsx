"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Dock from "@/components/Dock";
import {
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  DEV_MODE,
} from "@/lib/auth/auth-helpers";
import {
  fetchGameHistory,
  fetchUserStats,
  formatDate,
  formatTimeSpent,
  type GameHistory,
} from "@/lib/profile/profile-helpers";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userStats, setUserStats] = useState({
    total_games: 0,
    best_score: 0,
    school: "",
    target_university: "",
  });
  const [detailedStats, setDetailedStats] = useState({
    totalGames: 0,
    avgScore: 0,
    totalCorrect: 0,
    accuracy: 0,
    totalTimeSpent: 0,
  });
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedSchool, setEditedSchool] = useState("");
  const [editedUniversity, setEditedUniversity] = useState("");

  useEffect(() => {
    loadProfile();
  }, [router]);

  const loadProfile = async () => {
    try {
      const { user, error: userError } = await getCurrentUser();

      if (!user && !DEV_MODE) {
        router.push("/login");
        return;
      }

      const userData = user || {
        id: "dev-user-00000000-0000-0000-0000-000000000001",
        email: "dev@utbk-game.com",
      };
      const { profile, error: profileError } = await getUserProfile(
        userData.id
      );

      if (profile) {
        setUserId(profile.id || "");
        setUserName(profile.full_name || profile.username);
        setUserEmail(userData.email || "");
        setUserStats({
          total_games: profile.total_games || 0,
          best_score: profile.best_score || 0,
          school: profile.school || "",
          target_university: profile.target_university || "",
        });
        setEditedName(profile.full_name || profile.username);
        setEditedSchool(profile.school || "");
        setEditedUniversity(profile.target_university || "");

        // Fetch detailed stats and game history
        const { data: stats } = await fetchUserStats(userData.id);
        if (stats) {
          setDetailedStats({
            totalGames: stats.totalGames,
            avgScore: stats.avgScore,
            totalCorrect: stats.totalCorrect,
            accuracy: stats.accuracy,
            totalTimeSpent: stats.totalTimeSpent,
          });
        }

        const { data: history } = await fetchGameHistory(userData.id, 10);
        if (history) {
          setGameHistory(history);
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!editedName.trim()) return;

    try {
      const { profile, error } = await updateUserProfile(userId, {
        full_name: editedName,
        school: editedSchool,
        target_university: editedUniversity,
      });

      if (error) {
        alert("Gagal menyimpan profil");
        return;
      }

      setUserName(editedName);
      setUserStats({
        ...userStats,
        school: editedSchool,
        target_university: editedUniversity,
      });
      setIsEditing(false);
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Terjadi kesalahan saat menyimpan");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getCategoryLabel = (category: string | null | undefined) => {
    if (!category) return "Game";
    const cat = category.toLowerCase();
    // Game mode categories - show as "Game"
    if (cat === "mixed" || cat === "pu" || cat === "game") return "Game";
    // Try-out specific categories
    if (cat === "pbm") return "Pemahaman Bacaan";
    if (cat === "pm") return "Penalaran Matematika";
    if (cat === "ppu") return "Pengetahuan & Pemahaman";
    if (cat === "pk") return "Pengetahuan Kuantitatif";
    if (cat === "lbi") return "Literasi Bahasa Indonesia";
    if (cat === "tryout") return "Try-Out";
    return "Game";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-slate-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4">
            Profil{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Pengguna
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Kelola informasi akun Anda
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in">
          {/* Header dengan Avatar */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 text-center">
            <div className="inline-block">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-4xl sm:text-5xl shadow-xl">
                {getInitials(userName)}
              </div>
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
              {userName}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-blue-100 break-all px-4">
              {userEmail}
            </p>
          </div>

          {/* Profile Info */}
          <div className="p-4 sm:p-8 space-y-6">
            {/* Nama */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nama Lengkap
              </label>
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-slate-800 font-medium break-all">
                {userEmail}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Email tidak dapat diubah
              </p>
            </div>

            {/* Sekolah */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sekolah
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedSchool}
                  onChange={(e) => setEditedSchool(e.target.value)}
                  placeholder="Nama sekolah"
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-slate-800 font-medium">
                  {userStats.school || "Belum diisi"}
                </div>
              )}
            </div>

            {/* Target Universitas */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Target Universitas
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUniversity}
                  onChange={(e) => setEditedUniversity(e.target.value)}
                  placeholder="Target universitas"
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-slate-800 font-medium">
                  {userStats.target_university || "Belum diisi"}
                </div>
              )}
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {detailedStats.totalGames || 0}
                </div>
                <div className="text-sm text-slate-600 mt-1">Latihan</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 text-center">
                <div className="text-3xl font-bold text-indigo-600">
                  {userStats.best_score}
                </div>
                <div className="text-sm text-slate-600 mt-1">Skor Terbaik</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100 text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {detailedStats.avgScore}
                </div>
                <div className="text-sm text-slate-600 mt-1">Rata-rata</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-white p-4 rounded-xl border border-pink-100 text-center">
                <div className="text-3xl font-bold text-pink-600">
                  {detailedStats.accuracy}%
                </div>
                <div className="text-sm text-slate-600 mt-1">Akurasi</div>
              </div>
            </div>

            {/* Game History */}
            {gameHistory.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  📊 Riwayat Latihan
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {gameHistory.map((game, index) => (
                    <div
                      key={game.id}
                      className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-blue-600">
                              {game.score}
                            </span>
                            <span className="text-sm text-gray-500">poin</span>
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                              {getCategoryLabel(game.category)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>✅ {game.correct_answers} benar</span>
                            <span>❌ {game.wrong_answers} salah</span>
                            <span>
                              ⏱️ {formatTimeSpent(game.time_spent || 0)}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(game.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {userStats.total_games > 10 && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Menampilkan 10 latihan terakhir dari {userStats.total_games}{" "}
                    total latihan
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-200">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    💾 Simpan Perubahan
                  </button>
                  <button
                    onClick={() => {
                      setEditedName(userName);
                      setEditedSchool(userStats.school);
                      setEditedUniversity(userStats.target_university);
                      setIsEditing(false);
                    }}
                    className="flex-1 px-4 sm:px-6 py-3 bg-gray-200 text-slate-700 rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-300 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    ❌ Batal
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  ✏️ Edit Profil
                </button>
              )}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
              <Link href="/study">
                <button className="w-full px-4 sm:px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 active:scale-95">
                  🎮 Mulai Latihan
                </button>
              </Link>
              <Link href="/leaderboard">
                <button className="w-full px-4 sm:px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl text-sm sm:text-base font-semibold hover:bg-indigo-50 transition-all duration-300 hover:scale-105 active:scale-95">
                  🏆 Leaderboard
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 sm:mt-8">
          <Link href="/">
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
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

      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4">
        <Dock />
      </div>
      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, getUserProfile } from "@/lib/auth/auth-helpers";
import { signOut } from "@/lib/auth/auth-actions";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cek status login dari Supabase
  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const { user } = await getCurrentUser();

      if (user) {
        setIsLoggedIn(true);

        // Try to get username from profile
        const { profile } = await getUserProfile(user.id);
        if (profile && profile.username) {
          setUserName(profile.username);
        } else if (profile && profile.full_name) {
          setUserName(profile.full_name);
        } else if (user.email) {
          // Fallback to email username if profile doesn't exist yet
          setUserName(user.email.split("@")[0]);
        } else {
          setUserName("User");
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsLoggedIn(false);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut();
      setIsLoggedIn(false);
      setIsMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-gradient-to-r from-[#F9F7F7] via-[#DBE2EF]/80 to-[#F9F7F7] backdrop-blur-md shadow-lg border-b-2 border-[#3F72AF]/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3F72AF] to-[#112D4E]">
                QuizQuest
              </span>
              <span className="text-[8px] text-[#3F72AF]/70 font-semibold -mt-1">
                SNBT Game Platform
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {isLoggedIn ? (
              // Profile Button & Logout Button
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3F72AF] to-[#112D4E] hover:from-[#112D4E] hover:to-[#3F72AF] transition-all duration-300 shadow-lg shadow-[#3F72AF]/40 border-2 border-[#112D4E]/20">
                {/* Profile Button */}
                <Link href="/profile" className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] flex items-center justify-center text-[#3F72AF] font-bold text-sm border-2 border-[#3F72AF]/30">
                    {getInitials(userName)}
                  </div>
                  <span className="text-white font-bold">{userName}</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                  title="Logout"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              // Tombol Login (tampil jika belum login)
              <Link
                href="/login"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white font-bold hover:from-[#112D4E] hover:to-[#3F72AF] transition-all duration-300 shadow-lg shadow-[#3F72AF]/40 border-2 border-[#112D4E]/20"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button (Burger Icon) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-[#112D4E] hover:text-[#3F72AF] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t-2 border-[#3F72AF]/30 animate-slide-down bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF]/50">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white rounded-lg hover:from-[#112D4E] hover:to-[#3F72AF] transition-all shadow-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] flex items-center justify-center text-[#3F72AF] font-bold text-sm border-2 border-[#3F72AF]/30">
                    {getInitials(userName)}
                  </div>
                  <span className="font-bold">{userName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg"
                >
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-bold">Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white text-center font-bold rounded-lg hover:from-[#112D4E] hover:to-[#3F72AF] transition-all shadow-lg"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

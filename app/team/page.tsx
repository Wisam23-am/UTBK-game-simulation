"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamMemberCard from "@/components/TeamMemberCard";
import Dock from "@/components/Dock";

interface TeamMember {
  id: number;
  name: string;
  role?: string;
  major: string;
  image: string;
}

export default function TeamPage() {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team members from API
  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        setLoading(true);
        const response = await fetch("/api/team");

        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }

        const result = await response.json();

        if (result.success) {
          setTeamMembers(result.data);
        } else {
          throw new Error(result.error || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching team:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load team members"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F7F7] via-[#DBE2EF] to-[#3F72AF]/20 relative overflow-hidden">
      <Navbar />

      {/* Animated Background Decorations */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-[#3F72AF]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#112D4E]/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#3F72AF]/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Geometric Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with Illustration */}
          <div className="text-center mb-16 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-12">
              {/* Left: Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DBE2EF] to-[#F9F7F7] backdrop-blur-sm text-[#112D4E] px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in border-2 border-[#3F72AF]/40">
                  <span className="text-2xl animate-bounce">🌟</span>
                  <span>Kenalan dengan Tim Keren Kami</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-slide-down">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3F72AF] via-[#112D4E] to-[#3F72AF]">
                    Dibalik QuizQuest Ada
                  </span>
                  <br />
                  <span className="text-[#112D4E]">Tim Solid Kami 🚀</span>
                </h1>

                <p className="text-[#112D4E]/80 text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 animate-fade-in-delay leading-relaxed font-semibold">
                  Sekumpulan manusia passionate yang berdedikasi menciptakan
                  revolusi belajar SNBT untuk generasi juara Indonesia! 🎯✨
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-8">
                  <div className="bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border-2 border-[#3F72AF]/30">
                    <div className="text-3xl font-bold text-[#3F72AF]">
                      {teamMembers.length || "6"}
                    </div>
                    <div className="text-sm text-[#112D4E] font-bold">
                      Kreator Keren
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#DBE2EF] to-[#F9F7F7] backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border-2 border-[#3F72AF]/30">
                    <div className="text-3xl font-bold text-[#112D4E]">
                      100%
                    </div>
                    <div className="text-sm text-[#112D4E] font-bold">
                      Pure Energy
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border-2 border-[#3F72AF]/30">
                    <div className="text-3xl font-bold text-[#3F72AF]">∞</div>
                    <div className="text-sm text-[#112D4E] font-bold">
                      Ide Brilian
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Illustration */}
              <div className="flex-1 relative animate-float">
                <div className="relative w-full max-w-md mx-auto">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#3F72AF]/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                  <div
                    className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#112D4E]/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  {/* Main illustration */}
                  <div className="relative z-10 bg-gradient-to-br from-[#F9F7F7] to-[#DBE2EF] rounded-3xl p-8 shadow-2xl border-2 border-[#3F72AF]/40">
                    <img
                      src="/logo.png"
                      alt="Team Logo"
                      className="w-full h-auto"
                      loading="eager"
                    />
                  </div>

                  {/* Floating badges */}
                  <div className="absolute -top-8 -right-8 bg-gradient-to-br from-[#3F72AF] to-[#112D4E] text-white px-4 py-2 rounded-full shadow-xl transform rotate-12 animate-bounce z-20 border-2 border-[#F9F7F7]/50">
                    <span className="font-bold drop-shadow-md">
                      ✨ Super Kreatif
                    </span>
                  </div>
                  <div
                    className="absolute -bottom-4 -left-8 bg-gradient-to-br from-[#112D4E] to-[#3F72AF] text-white px-4 py-2 rounded-full shadow-xl transform -rotate-12 animate-bounce z-20 border-2 border-[#F9F7F7]/50"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <span className="font-bold drop-shadow-md">
                      🔥 Full Passion
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#3F72AF] rounded-full"></div>
              <div className="h-1.5 w-20 bg-gradient-to-r from-[#3F72AF] via-[#112D4E] to-[#3F72AF] rounded-full"></div>
              <div className="h-1 w-12 bg-gradient-to-r from-[#3F72AF] to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#DBE2EF]"></div>
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-[#3F72AF] absolute top-0 left-0"></div>
              </div>
              <p className="text-[#112D4E] text-lg mt-6 animate-pulse font-semibold">
                Memuat orang-orang hebat... ✨
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <div className="text-5xl mb-4">�</div>
              <h3 className="text-2xl font-bold text-red-800 mb-2">
                Waduh! Ada Kendala Teknis Nih
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Coba Lagi Yuk!
              </button>
            </div>
          )}

          {/* Team Grid with stagger animation */}
          {!loading && !error && teamMembers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TeamMemberCard member={member} index={index} />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && teamMembers.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Tim Lagi Ngumpul Nih
              </h3>
              <p className="text-gray-600">Sabar ya, bentar lagi muncul! 🚀</p>
            </div>
          )}
        </div>
      </section>

      {/* Dock Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4">
        <Dock />
      </div>

      <Footer />
    </div>
  );
}

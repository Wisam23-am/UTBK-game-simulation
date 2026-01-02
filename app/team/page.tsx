'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamMemberCard from '@/components/TeamMemberCard';
import Dock from '@/components/Dock';

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
        const response = await fetch('/api/team');
        
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setTeamMembers(result.data);
        } else {
          throw new Error(result.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching team:', err);
        setError(err instanceof Error ? err.message : 'Failed to load team members');
      } finally {
        setLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <Navbar />

      {/* Animated Background Decorations */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section with Illustration */}
          <div className="text-center mb-16 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-12">
              
              {/* Left: Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
                  <span className="text-2xl animate-bounce">👥</span>
                  <span>Meet Our Amazing Team</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-slide-down">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Our Creative
                  </span>
                  <br />
                  <span className="text-slate-800">Team</span>
                </h1>
                
                <p className="text-gray-700 text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 animate-fade-in-delay leading-relaxed">
                  Tim passionate yang berkomitmen membangun platform edukasi terbaik untuk siswa Indonesia
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                    <div className="text-3xl font-bold text-blue-600">{teamMembers.length || '6'}</div>
                    <div className="text-sm text-gray-600 font-medium">Team Members</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                    <div className="text-3xl font-bold text-indigo-600">100%</div>
                    <div className="text-sm text-gray-600 font-medium">Dedication</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                    <div className="text-3xl font-bold text-purple-600">∞</div>
                    <div className="text-sm text-gray-600 font-medium">Innovation</div>
                  </div>
                </div>
              </div>
              
              {/* Right: Illustration */}
              <div className="flex-1 relative animate-float">
                <div className="relative w-full max-w-md mx-auto">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  {/* Main illustration */}
                  <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl">
                    <img 
                      src="/logo.png" 
                      alt="Team Logo"
                      className="w-full h-auto"
                      loading="eager"
                    />
                  </div>
                  
                  {/* Floating badges */}
                  <div className="absolute -top-8 -right-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg transform rotate-12 animate-bounce z-20">
                    <span className="font-bold">✨ Creative</span>
                  </div>
                  <div className="absolute -bottom-4 -left-8 bg-gradient-to-br from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg transform -rotate-12 animate-bounce z-20" style={{ animationDelay: '0.5s' }}>
                    <span className="font-bold">🚀 Innovative</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
              <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 absolute top-0 left-0"></div>
              </div>
              <p className="text-gray-700 text-lg mt-6 animate-pulse">Loading amazing people...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <div className="text-5xl mb-4">😞</div>
              <h3 className="text-2xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Try Again
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
                  <TeamMemberCard 
                    member={member} 
                    index={index}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && teamMembers.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No team members yet</h3>
              <p className="text-gray-600">Check back soon!</p>
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

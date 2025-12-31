'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchLeaderboard, type LeaderboardEntry } from '@/lib/leaderboard/leaderboard-helpers';

interface DisplayEntry {
  rank: number;
  name: string;
  score: number;
  badge?: string;
}

interface LeaderboardCardProps {
  compact?: boolean;
}

export default function LeaderboardCard({ compact = false }: LeaderboardCardProps) {
  const [topPlayers, setTopPlayers] = useState<DisplayEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTopPlayers();
  }, []);

  async function loadTopPlayers() {
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await fetchLeaderboard(5); // Get top 5

      if (fetchError || !data) {
        console.error('Error loading top players:', fetchError);
        setError('Gagal memuat leaderboard');
        return;
      }

      // Transform to display format
      const displayData: DisplayEntry[] = data.map((entry) => ({
        rank: entry.rank,
        name: entry.full_name || entry.username,
        score: entry.best_score,
        badge: entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : undefined,
      }));

      setTopPlayers(displayData);
      console.log('✅ Top 5 players loaded');
    } catch (err) {
      console.error('Exception loading top players:', err);
      setError('Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-blue-400 to-blue-600';
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-yellow-50/50';
    if (rank === 2) return 'bg-gray-50/50';
    if (rank === 3) return 'bg-orange-50/50';
    return 'bg-white';
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-[#3F72AF]/30 overflow-hidden ${compact ? '' : 'animate-scale-in'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3F72AF] to-[#112D4E] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">Top 5 Leaderboard</h3>
          </div>
          <Link href="/leaderboard">
            <button className="text-xs sm:text-sm text-white/80 hover:text-white font-medium underline transition-all">
              Lihat Semua
            </button>
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3F72AF]"></div>
          <p className="mt-4 text-gray-500 text-sm">Memuat leaderboard...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={loadTopPlayers}
            className="px-4 py-2 bg-[#3F72AF] text-white rounded-lg hover:bg-[#112D4E] transition-all"
          >
            🔄 Coba Lagi
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && topPlayers.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-4">Belum ada pemain di leaderboard.</p>
          <p className="text-gray-500 text-sm">Jadilah yang pertama!</p>
        </div>
      )}

      {/* Leaderboard List */}
      {!isLoading && !error && topPlayers.length > 0 && (
        <>
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {topPlayers.map((player, index) => (
          <div
            key={player.rank}
            className={`group flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-102 ${
              getRankBg(player.rank)
            } ${
              index < 3 ? 'border-2' : 'border'
            } ${
              player.rank === 1 ? 'border-yellow-300' :
              player.rank === 2 ? 'border-gray-300' :
              player.rank === 3 ? 'border-orange-300' :
              'border-gray-200'
            }`}
          >
            {/* Left: Rank & Name */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {/* Rank Badge */}
              {player.badge ? (
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl">{player.badge}</span>
                </div>
              ) : (
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${getRankColor(player.rank)} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md`}>
                  {player.rank}
                </div>
              )}

              {/* Avatar & Name */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${getRankColor(player.rank)} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md`}>
                  {player.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-[#112D4E] text-sm sm:text-base truncate ${
                    player.rank <= 3 ? 'font-bold' : ''
                  }`}>
                    {player.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Score */}
            <div className="flex-shrink-0 ml-2">
              <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg ${
                player.rank === 1 ? 'bg-yellow-100' :
                player.rank === 2 ? 'bg-gray-100' :
                player.rank === 3 ? 'bg-orange-100' :
                'bg-blue-50'
              }`}>
                <p className={`font-bold text-sm sm:text-lg ${
                  player.rank === 1 ? 'text-yellow-700' :
                  player.rank === 2 ? 'text-gray-700' :
                  player.rank === 3 ? 'text-orange-700' :
                  'text-[#3F72AF]'
                }`}>
                  {player.score}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="p-3 sm:p-4 pt-0">
        <Link href="/leaderboard">
          <button className="w-full px-4 py-3 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white rounded-xl font-semibold hover:from-[#112D4E] hover:to-[#3F72AF] transition-all duration-300 shadow-md hover:scale-105 active:scale-95 text-sm sm:text-base">
            📊 Lihat Peringkat Lengkap
          </button>
        </Link>
      </div>
        </>
      )}
    </div>
  );
}

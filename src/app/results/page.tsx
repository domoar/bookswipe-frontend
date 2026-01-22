'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StarsBackground from '@/components/StarsBackground';

interface GenreAnalysis {
  genre: string;
  percentage: number;
  count: number;
  rank: number;
}

export default function ResultsPage() {
  const router = useRouter();
  const [genreAnalysis, setGenreAnalysis] = useState<GenreAnalysis[]>([]);
  const [topGenre, setTopGenre] = useState<GenreAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load swipe history from localStorage
    const history = localStorage.getItem('swipeHistory');
    if (!history) {
      router.push('/swipe');
      return;
    }

    const allHistory = JSON.parse(history);
    const latestSession = allHistory[allHistory.length - 1];
    
    if (!latestSession || !latestSession.likedBooks) {
      router.push('/swipe');
      return;
    }

    // Analyze genres
    const genreCounts: Record<string, number> = {};
    const totalBooks = latestSession.likedBooks.length;

    latestSession.likedBooks.forEach((book: any) => {
      // Count main genre
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
      
      // Count sub-genres (with less weight)
      book.subGenres?.forEach((subGenre: string) => {
        genreCounts[subGenre] = (genreCounts[subGenre] || 0) + 0.5;
      });
    });

    // Convert to analysis array and calculate percentages
    const analysis: GenreAnalysis[] = Object.entries(genreCounts)
      .map(([genre, count]) => ({
        genre,
        count: Math.round(count),
        percentage: Math.round((count / totalBooks) * 100),
        rank: 0
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 6) // Top 6 genres for radar chart
      .map((item, index) => ({ ...item, rank: index + 1 }));

    setGenreAnalysis(analysis);
    setTopGenre(analysis[0] || null);
    setLoading(false);
  }, [router]);

  // Radar chart calculation
  const getRadarPoints = () => {
    if (genreAnalysis.length === 0) return '';
    
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 120;
    const angleStep = (Math.PI * 2) / genreAnalysis.length;

    return genreAnalysis
      .map((item, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const radius = (item.percentage / 100) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB]">
        <StarsBackground />
        <div className="relative z-10 text-white text-xl">Analysiere deine Vorlieben...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Top Bar */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-4 pb-2">
        <button onClick={() => router.push('/home')} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-white text-xl font-bold">Deine Auswertung</h1>
        <button onClick={() => router.push('/home')} className="text-white text-sm">
          Fertig
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 px-6 py-4 pb-24 overflow-y-auto">
        
        {/* Header with Stats */}
        {topGenre && (
          <div className="bg-gradient-to-r from-[#D69A2C]/20 to-[#C8922A]/20 backdrop-blur-sm border border-[#D69A2C]/30 rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#D69A2C] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-white text-2xl font-bold">
                  {topGenre.percentage}% {topGenre.genre}
                </h2>
                <p className="text-white/80 text-sm">
                  Du bist in den Top 5% der {topGenre.genre}-Liebhaber! 🎉
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Basierend auf deinen Swipes zeigst du eine starke Präferenz für {topGenre.genre}-Bücher.
              Das macht dich zu einem echten Fan dieses Genres!
            </p>
          </div>
        )}

        {/* Radar Chart */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-white/20">
          <h3 className="text-white text-xl font-bold mb-6 text-center">
            Dein Genre-Profil
          </h3>
          
          <div className="flex justify-center items-center">
            <svg width="300" height="300" viewBox="0 0 300 300">
              {/* Background circles */}
              {[20, 40, 60, 80, 100].map((percent) => (
                <circle
                  key={percent}
                  cx="150"
                  cy="150"
                  r={(120 * percent) / 100}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Axis lines */}
              {genreAnalysis.map((_, index) => {
                const angle = ((Math.PI * 2) / genreAnalysis.length) * index - Math.PI / 2;
                const x = 150 + 120 * Math.cos(angle);
                const y = 150 + 120 * Math.sin(angle);
                return (
                  <line
                    key={index}
                    x1="150"
                    y1="150"
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data polygon */}
              {genreAnalysis.length > 0 && (
                <>
                  <polygon
                    points={getRadarPoints()}
                    fill="rgba(214, 154, 44, 0.3)"
                    stroke="#D69A2C"
                    strokeWidth="2"
                  />
                  {/* Data points */}
                  {genreAnalysis.map((item, index) => {
                    const angle = ((Math.PI * 2) / genreAnalysis.length) * index - Math.PI / 2;
                    const radius = (item.percentage / 100) * 120;
                    const x = 150 + radius * Math.cos(angle);
                    const y = 150 + radius * Math.sin(angle);
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#D69A2C"
                      />
                    );
                  })}
                </>
              )}

              {/* Labels */}
              {genreAnalysis.map((item, index) => {
                const angle = ((Math.PI * 2) / genreAnalysis.length) * index - Math.PI / 2;
                const x = 150 + 140 * Math.cos(angle);
                const y = 150 + 140 * Math.sin(angle);
                return (
                  <text
                    key={index}
                    x={x}
                    y={y}
                    fill="white"
                    fontSize="12"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {item.genre}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Genre Breakdown */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
          <h3 className="text-white text-xl font-bold mb-4">Genre-Verteilung</h3>
          <div className="space-y-3">
            {genreAnalysis.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{item.genre}</span>
                  <span className="text-white/70">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D69A2C] to-[#C8922A] rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={() => router.push('/swipe')}
            className="w-full bg-gradient-to-r from-[#D69A2C] to-[#C8922A] text-white rounded-full py-4 font-bold text-lg hover:scale-105 transition-transform"
          >
            Weiter Swipen
          </button>
        </div>
      </div>
    </div>
  );
}

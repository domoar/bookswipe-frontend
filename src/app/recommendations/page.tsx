'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import StarsBackground from '@/components/StarsBackground';
import { getRecommendations, Book } from '@/services/api';

interface Recommendation {
  book: Book;
  match: number;
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getRecommendations();
        
        const recs = data.recommendations.map(book => ({
          book,
          match: Math.round(data.matchPercentages[book.id] || 0)
        }));
        
        recs.sort((a, b) => b.match - a.match);
        
        setRecommendations(recs);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
        setError('Fehler beim Laden');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
        <StarsBackground />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-[#D69A2C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Lade Empfehlungen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden p-6">
        <StarsBackground />
        <div className="relative z-10 text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-white text-2xl font-bold mb-3">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#D69A2C] text-white rounded-full font-medium hover:bg-[#C8922A] transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />
      <div className="relative z-30 px-6 pt-12 pb-6">
        <button onClick={() => router.back()} className="text-white mb-8">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[#D69A2C] text-4xl font-bold mb-3 text-center">Deine Persönlichen Empfehlungen</h1>
      </div>
      <div className="relative z-10 flex-1 px-6 pb-28 space-y-4 overflow-y-auto">
        {recommendations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-white text-lg mb-2">Noch keine Empfehlungen</p>
          </div>
        ) : (
          recommendations.map((rec, index) => (
            <button
              key={index}
              className="w-full bg-[#D69A2C] rounded-3xl p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 text-left">
                  <h3 className="text-white font-bold text-lg mb-1">{rec.book.title}</h3>
                  <p className="text-white/90 text-sm">{rec.book.author}</p>
                </div>
                <span className="text-white font-bold text-3xl">{rec.match}%</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

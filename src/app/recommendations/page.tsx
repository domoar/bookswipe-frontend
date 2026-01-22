'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import StarsBackground from '@/components/StarsBackground';
import { booksData, Book } from '@/data/books';

interface Recommendation {
  book: Book;
  match: number;
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Get user preferences and swipe history
    const prefsStr = localStorage.getItem('userPreferences');
    const historyStr = localStorage.getItem('swipeHistory');
    
    if (!prefsStr || !historyStr) {
      // No data, show all books with random matches
      const recs = booksData.map((book: Book) => ({
        book,
        match: Math.floor(Math.random() * 30) + 70 // 70-100%
      })).sort((a: Recommendation, b: Recommendation) => b.match - a.match);
      setRecommendations(recs);
      return;
    }

    const prefs = JSON.parse(prefsStr);
    const history = JSON.parse(historyStr);

    // Calculate match percentage based on genres and swipe history
    const recs = booksData.map((book: Book) => {
      let matchScore = 50; // Base score

      // Genre matching
      if (prefs.genres?.includes(book.genre)) {
        matchScore += 20;
      }

      // Check if user liked similar books
      const likedBooks = history.filter((h: any) => h.liked).map((h: any) => h.book);
      const likedSimilar = likedBooks.some((b: any) => 
        b.genre === book.genre || b.subGenres?.some((sg: string) => book.subGenres?.includes(sg))
      );
      if (likedSimilar) {
        matchScore += 15;
      }

      // Interest matching with subgenres
      const hasInterestMatch = book.subGenres?.some((sg: string) => 
        prefs.interests?.includes(sg)
      );
      if (hasInterestMatch) {
        matchScore += 15;
      }

      // Randomize a bit to make it feel natural
      matchScore += Math.floor(Math.random() * 10) - 5;

      return {
        book,
        match: Math.min(100, Math.max(60, matchScore))
      };
    }).sort((a: Recommendation, b: Recommendation) => b.match - a.match);

    setRecommendations(recs);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Header */}
      <div className="relative z-30 px-6 pt-12 pb-6">
        <button onClick={() => router.back()} className="text-white mb-8">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-[#D69A2C] text-4xl font-bold mb-3 text-center">Deine Persönlichen Empfehlungen</h1>
      </div>

      {/* Recommendations List */}
      <div className="relative z-10 flex-1 px-6 pb-28 space-y-4 overflow-y-auto">
        {recommendations.map((rec, index) => (
          <button
            key={index}
            onClick={() => router.push(`/book/${index}`)}
            className="w-full bg-[#D69A2C] rounded-3xl p-5 hover:bg-[#C8922A] transition-all duration-200 hover:scale-[1.02] active:scale-95 relative overflow-hidden"
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <div className="w-6 h-6 bg-white/30 rounded flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>

              {/* Book Info */}
              <div className="flex-1 text-left">
                <h3 className="text-white font-bold text-lg mb-1">{rec.book.title}</h3>
                <p className="text-white/90 text-sm mb-1">{rec.book.author}, {rec.book.year}</p>
                <p className="text-white/80 text-sm">{rec.book.genre}</p>
              </div>

              {/* Match Percentage with Arrow */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-white font-bold text-3xl">{rec.match}%</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0F0E5F]/50 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-8 py-5">
          <button onClick={() => router.push('/home')} className="flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-110 active:scale-95">
            <svg className="w-7 h-7 text-white/50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </button>

          <button onClick={() => router.push('/library')} className="flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-110 active:scale-95">
            <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>

          <button onClick={() => router.push('/profile')} className="flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-110 active:scale-95">
            <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          <button onClick={() => router.push('/results')} className="flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-110 active:scale-95">
            <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

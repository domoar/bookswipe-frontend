'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import SwipeInterface from '@/components/SwipeInterface';
import { getAllBooks, completeSwipeSession, Book } from '@/services/api';
import StarsBackground from '@/components/StarsBackground';

export default function SwipePage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const fetchedBooks = await getAllBooks();
        setBooks(fetchedBooks);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch books:', err);
        setError('Fehler beim Laden der Bücher');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleComplete = async (likedBooks: Book[]) => {
    const likedBookIds = likedBooks.map(book => book.id);
    const allBookIds = books.map(book => book.id);
    const rejectedBookIds = allBookIds.filter(id => !likedBookIds.includes(id));

    try {
      await completeSwipeSession({
        likedBookIds,
        rejectedBookIds,
      });

      const swipeHistory = {
        likedBooks: likedBooks.map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          genre: book.genre,
          subGenres: book.subGenres
        })),
        completedAt: new Date().toISOString()
      };
      
      const existingHistory = localStorage.getItem('swipeHistory');
      const allHistory = existingHistory ? JSON.parse(existingHistory) : [];
      allHistory.push(swipeHistory);
      localStorage.setItem('swipeHistory', JSON.stringify(allHistory));
    } catch (err) {
      console.error('Failed to complete swipe session:', err);
    }
    
    router.push('/post-swipe');
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
        <StarsBackground />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-[#D69A2C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Lade Bücher...</p>
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

  if (books.length === 0) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden p-6">
        <StarsBackground />
        <div className="relative z-10 text-center max-w-md">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-white text-2xl font-bold mb-3">Keine Bücher verfügbar</h2>
          <p className="text-white/70 mb-6">Derzeit sind keine Bücher zum Swipen verfügbar.</p>
          <button
            onClick={() => router.push('/home')}
            className="px-6 py-3 bg-[#D69A2C] text-white rounded-full font-medium hover:bg-[#C8922A] transition-colors"
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

  return <SwipeInterface books={books} onComplete={handleComplete} />;
}

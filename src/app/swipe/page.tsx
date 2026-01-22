'use client';

import { useRouter } from 'next/navigation';
import SwipeInterface from '@/components/SwipeInterface';
import { booksData } from '@/data/books';

export default function SwipePage() {
  const router = useRouter();

  const handleComplete = (likedBooks: typeof booksData) => {
    // Save to localStorage
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
    
    // Navigate to results
    router.push('/results');
  };

  return <SwipeInterface books={booksData} onComplete={handleComplete} />;
}

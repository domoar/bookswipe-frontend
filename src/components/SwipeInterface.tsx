'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SwipeCard from './SwipeCard';
import StarsBackground from './StarsBackground';
import { Book } from '@/data/books';

interface SwipeInterfaceProps {
  books: Book[];
  onComplete: (likedBooks: Book[]) => void;
}

export default function SwipeInterface({ books, onComplete }: SwipeInterfaceProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentBook = books[currentIndex];

    if (direction === 'right') {
      setLikedBooks([...likedBooks, currentBook]);
    }

    // Move to next card
    const nextIndex = currentIndex + 1;
    
    if (nextIndex >= books.length) {
      // All books swiped, show results
      setTimeout(() => {
        onComplete(direction === 'right' ? [...likedBooks, currentBook] : likedBooks);
      }, 400);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    handleSwipe(direction);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Top Bar with time and icons */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-4 pb-2">
        {/* Back to Home Button */}
        <button 
          onClick={() => router.push('/home')}
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Home</span>
        </button>

        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex flex-col gap-0.5">
            <div className="w-0.5 h-1 bg-white rounded"></div>
            <div className="w-0.5 h-2 bg-white rounded"></div>
            <div className="w-0.5 h-2.5 bg-white rounded"></div>
            <div className="w-0.5 h-3 bg-white rounded"></div>
          </div>
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-32">
        {/* Cards Stack */}
        <div className="relative w-full max-w-[420px] h-[580px]">
          {books.map((book, index) => {
            // Only render current and next card
            if (index < currentIndex || index > currentIndex + 1) return null;

            return (
              <SwipeCard
                key={book.id}
                book={book}
                onSwipe={handleSwipe}
                isTop={index === currentIndex}
              />
            );
          })}

          {/* Empty state when all swiped */}
          {currentIndex >= books.length && (
            <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
              <p className="text-xl text-white">Analysiere deine Vorlieben...</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="relative z-20 flex items-center justify-center gap-8 mt-8">
          {/* Dislike Button */}
          <button
            onClick={() => handleButtonSwipe('left')}
            disabled={currentIndex >= books.length}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-red-500 flex items-center justify-center hover:scale-110 hover:bg-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Undo Button */}
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
                if (likedBooks.length > 0) {
                  setLikedBooks(likedBooks.slice(0, -1));
                }
              }
            }}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-2 border-[#D69A2C] flex items-center justify-center hover:scale-110 hover:bg-[#D69A2C]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-[#D69A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>

          {/* Like Button */}
          <button
            onClick={() => handleButtonSwipe('right')}
            disabled={currentIndex >= books.length}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-green-500 flex items-center justify-center hover:scale-110 hover:bg-green-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="relative z-30 bg-[#0F0E5F]/50 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-8 py-4">
          <button 
            onClick={() => router.push('/home')}
            className="flex flex-col items-center gap-1 transition-all hover:scale-110"
          >
            <svg className="w-7 h-7 text-[#D69A2C]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </button>

          <button 
            onClick={() => router.push('/library')}
            className="flex flex-col items-center gap-1 transition-all hover:scale-110"
          >
            <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>

          <button 
            onClick={() => router.push('/profile')}
            className="flex flex-col items-center gap-1 transition-all hover:scale-110"
          >
            <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          <button 
            onClick={() => router.push('/settings')}
            className="flex flex-col items-center gap-1 transition-all hover:scale-110"
          >
            <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

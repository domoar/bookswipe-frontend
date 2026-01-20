'use client';

import { useState } from 'react';
import SwipeCard from './SwipeCard';
import StarsBackground from './StarsBackground';
import { Quote } from '@/types';

interface SwipeInterfaceProps {
  quotes: Quote[];
  onComplete: (likedQuotes: Quote[]) => void;
}

export default function SwipeInterface({ quotes, onComplete }: SwipeInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedQuotes, setLikedQuotes] = useState<Quote[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentQuote = quotes[currentIndex];

    if (direction === 'right') {
      setLikedQuotes([...likedQuotes, currentQuote]);
    }

    // Move to next card
    const nextIndex = currentIndex + 1;
    
    if (nextIndex >= quotes.length) {
      // All quotes swiped, show results
      setTimeout(() => {
        onComplete(direction === 'right' ? [...likedQuotes, currentQuote] : likedQuotes);
      }, 400);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    handleSwipe(direction);
  };

  const progress = ((currentIndex + 1) / quotes.length) * 100;
  const remainingCards = quotes.length - currentIndex;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] px-6 py-12">
      <StarsBackground />

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="mb-8 w-full max-w-md">
          <div className="mb-2 flex items-center justify-between text-white">
            <span className="text-sm font-medium">
              {currentIndex + 1} von {quotes.length}
            </span>
            <span className="text-sm font-medium">
              {remainingCards} übrig
            </span>
          </div>
          {/* Progress Bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D69A2C] to-[#C8922A] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cards Stack */}
        <div className="relative mb-12 h-[500px] w-[340px]">
          {quotes.map((quote, index) => {
            // Only render current and next card
            if (index < currentIndex || index > currentIndex + 1) return null;

            return (
              <SwipeCard
                key={quote.id}
                quote={quote}
                onSwipe={handleSwipe}
                isTop={index === currentIndex}
              />
            );
          })}

          {/* Empty state when all swiped */}
          {currentIndex >= quotes.length && (
            <div className="flex h-[500px] w-[340px] items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
              <p className="text-xl text-white">Analysiere deine Vorlieben...</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => handleButtonSwipe('left')}
            disabled={currentIndex >= quotes.length}
            className="group flex h-16 w-16 items-center justify-center rounded-full border-4 border-red-500 bg-white shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Nicht interessiert"
          >
            <svg
              className="h-8 w-8 text-red-500 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            onClick={() => handleButtonSwipe('right')}
            disabled={currentIndex >= quotes.length}
            className="group flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-500 bg-white shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Gefällt mir"
          >
            <svg
              className="h-10 w-10 text-green-500 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            className="group flex h-14 w-14 items-center justify-center rounded-full border-4 border-yellow-500 bg-white shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Info"
          >
            <svg
              className="h-6 w-6 text-yellow-500 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        {/* Instructions */}
        <p className="mt-8 text-center text-sm text-white/70">
          Swipe nach rechts für "Gefällt mir" • Nach links für "Nicht interessiert"
        </p>
      </div>
    </div>
  );
}

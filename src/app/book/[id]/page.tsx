'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import StarsBackground from '@/components/StarsBackground';
import { booksData } from '@/data/books';

const purchaseOptions = [
  { name: 'Amazon', icon: '🛒', color: '#FF9900' },
  { name: 'Thalia', icon: '📚', color: '#D69A2C' },
  { name: 'Ticketshop', icon: '🎫', color: '#4A90E2' },
  { name: 'Spotify', icon: '🎵', color: '#1DB954' }
];

export default function BookDetailPage() {
  const router = useRouter();
  const params = useParams();
  const bookId = params.id as string;
  const book = booksData[parseInt(bookId)] || booksData[0];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Header */}
      <div className="relative z-30 px-6 pt-12 pb-4">
        <button onClick={() => router.back()} className="text-white mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Book Cover & Info */}
      <div className="relative z-10 px-6 pb-6">
        <div className="flex gap-5 mb-6">
          {/* Cover */}
          <div className="w-32 h-48 bg-gradient-to-br from-[#D69A2C]/40 to-[#D69A2C]/10 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-[#D69A2C]/40 shadow-2xl">
            <svg className="w-12 h-12 text-[#D69A2C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold mb-2">{book.title}</h1>
            <p className="text-white/70 text-lg mb-3">{book.author}</p>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-[#D69A2C]' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/60 text-sm">{book.rating.toFixed(1)}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full">
                {book.genre}
              </span>
              <span className="text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full">
                {book.year}
              </span>
              <span className="text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full">
                {book.pageCount} Seiten
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 mb-6">
          <h2 className="text-[#D69A2C] text-lg font-bold mb-3">Beschreibung</h2>
          <p className="text-white/80 text-sm leading-relaxed">{book.description}</p>
        </div>

        {/* Quote Preview */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 mb-6">
          <h2 className="text-[#D69A2C] text-lg font-bold mb-3">Leseprobe</h2>
          <div className="relative">
            <p className="text-white/90 text-sm leading-relaxed italic">
              "{book.quotes[currentQuoteIndex].text}"
            </p>
            {book.quotes[currentQuoteIndex].page && (
              <p className="text-white/50 text-xs mt-3">— Seite {book.quotes[currentQuoteIndex].page}</p>
            )}
          </div>
          
          {/* Quote Navigation Dots */}
          {book.quotes.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {book.quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuoteIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentQuoteIndex
                      ? 'bg-[#D69A2C] w-6'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Subgenres */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 mb-6">
          <h2 className="text-[#D69A2C] text-lg font-bold mb-3">Kategorien</h2>
          <div className="flex flex-wrap gap-2">
            {book.subGenres.map((subGenre, index) => (
              <span key={index} className="text-sm text-white bg-white/10 px-3 py-2 rounded-xl border border-white/20">
                {subGenre}
              </span>
            ))}
          </div>
        </div>

        {/* Purchase Options */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
          <h2 className="text-[#D69A2C] text-lg font-bold mb-4">Wo kaufen?</h2>
          <div className="grid grid-cols-2 gap-3">
            {purchaseOptions.map((option, index) => (
              <button
                key={index}
                className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl p-4 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl">{option.icon}</div>
                  <span className="text-white font-medium text-sm">{option.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-24"></div>

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

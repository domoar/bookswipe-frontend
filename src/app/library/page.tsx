'use client';

import { useRouter } from 'next/navigation';
import StarsBackground from '@/components/StarsBackground';

export default function LibraryPage() {
  const router = useRouter();

  const likedBooks = [
    { id: 1, title: 'Der große Gatsby', author: 'F. Scott Fitzgerald', year: 2020 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 2019 },
    { id: 3, title: '1984', author: 'George Orwell', year: 2021 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: 2018 },
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 2020 },
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Top Bar */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-4 pb-2">
        <h1 className="text-white text-2xl font-bold">Meine Bibliothek</h1>
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 px-6 py-4 pb-24 overflow-y-auto">
        {/* Stats */}
        <div className="mb-6">
          <p className="text-white/70 text-sm mb-2">Gelikte Bücher</p>
          <p className="text-white text-4xl font-bold">{likedBooks.length}</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button className="px-4 py-2 rounded-full bg-[#D69A2C] text-white text-sm font-medium whitespace-nowrap">
            Alle
          </button>
          <button className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-medium whitespace-nowrap hover:bg-white/20">
            Roman
          </button>
          <button className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-medium whitespace-nowrap hover:bg-white/20">
            Thriller
          </button>
          <button className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-medium whitespace-nowrap hover:bg-white/20">
            Fantasy
          </button>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 gap-4">
          {likedBooks.map((book, index) => (
            <button 
              key={book.id} 
              onClick={() => router.push(`/book/${index}`)}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:scale-105 transition-transform"
            >
              <div className="w-full h-48 bg-gradient-to-br from-[#D69A2C]/40 to-[#D69A2C]/10 rounded-xl mb-3 flex items-center justify-center border border-[#D69A2C]/30">
                <svg className="w-12 h-12 text-[#D69A2C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{book.title}</h3>
              <p className="text-white/70 text-xs mb-1">{book.author}</p>
              <p className="text-white/50 text-xs">{book.year}</p>
              
              {/* Action Icons */}
              <div className="flex gap-2 mt-3">
                <div className="flex-1 bg-[#D69A2C] rounded-lg py-2 text-white text-xs font-medium">
                  Details
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Empty State (hidden when there are books) */}
        {likedBooks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="w-20 h-20 text-white/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-white/70 text-center mb-4">Noch keine Bücher in deiner Bibliothek</p>
            <button
              onClick={() => router.push('/swipe')}
              className="px-6 py-3 bg-[#D69A2C] text-white rounded-full font-medium hover:bg-[#C8922A]"
            >
              Jetzt Swipen
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-30 bg-[#0F0E5F]/50 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-8 py-5">
          <button onClick={() => router.push('/home')} className="flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-110 active:scale-95">
            <svg className="w-7 h-7 text-white/50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </button>

          <button className="flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-110 active:scale-95">
            <svg className="w-7 h-7 text-[#D69A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

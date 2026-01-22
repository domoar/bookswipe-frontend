'use client';

import { useRouter } from 'next/navigation';
import StarsBackground from '@/components/StarsBackground';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Top Bar */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-4 pb-2">
        <h1 className="text-white text-2xl font-bold">BookSwipe</h1>
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-white text-3xl font-bold mb-2">Willkommen zurück! 👋</h2>
          <p className="text-white/70 text-lg">Bereit für neue Bücher?</p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => router.push('/swipe')}
            className="w-full bg-gradient-to-r from-[#D69A2C] to-[#C8922A] text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">Weiter Swipen</h3>
                <p className="text-white/90 text-sm">Finde dein nächstes Buch</p>
              </div>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => router.push('/recommendations')}
            className="w-full bg-white/10 backdrop-blur-sm text-white rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">Empfehlungen</h3>
                <p className="text-white/70 text-sm">Personalisiert für dich</p>
              </div>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => router.push('/library')}
            className="w-full bg-white/10 backdrop-blur-sm text-white rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">Meine Bibliothek</h3>
                <p className="text-white/70 text-sm">12 gelikte Bücher</p>
              </div>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Geswipte Bücher</p>
            <p className="text-white text-3xl font-bold">127</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Gelikte Bücher</p>
            <p className="text-white text-3xl font-bold">12</p>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="bg-gradient-to-r from-[#D69A2C]/20 to-[#C8922A]/20 backdrop-blur-sm rounded-2xl p-5 border border-[#D69A2C]/40 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-white text-lg font-bold mb-1">🎯 Tägliche Herausforderung</h3>
              <p className="text-white/80 text-sm">Swipe 20 Bücher heute!</p>
            </div>
            <div className="text-right">
              <p className="text-[#D69A2C] font-bold text-2xl">15/20</p>
            </div>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#D69A2C] rounded-full transition-all duration-300" style={{width: '75%'}}></div>
          </div>
          <p className="text-white/60 text-xs mt-2">+50 XP beim Abschluss 🏆</p>
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-xl font-bold">Empfohlen für dich</h3>
            <button 
              onClick={() => router.push('/recommendations')}
              className="text-[#D69A2C] text-sm font-medium"
            >
              Alle →
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Der große Gatsby', author: 'F. Scott Fitzgerald', match: 92 },
              { title: '1984', author: 'George Orwell', match: 88 },
              { title: 'Pride and Prejudice', author: 'Jane Austen', match: 85 },
            ].map((book, i) => (
              <button 
                key={i} 
                onClick={() => router.push(`/book/${i}`)}
                className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center gap-4 hover:bg-white/15 transition-colors"
              >
                <div className="w-12 h-16 bg-gradient-to-br from-[#D69A2C]/40 to-[#D69A2C]/10 rounded-lg flex items-center justify-center border border-[#D69A2C]/30">
                  <svg className="w-5 h-5 text-[#D69A2C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-white font-bold mb-1">{book.title}</h4>
                  <p className="text-white/70 text-sm">{book.author}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-[#D69A2C] flex items-center justify-center bg-[#D69A2C]/10">
                    <span className="text-[#D69A2C] font-bold text-sm">{book.match}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-30 bg-[#0F0E5F]/50 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-8 py-5">
          <button className="flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-110 active:scale-95">
            <svg className="w-7 h-7 text-[#D69A2C]" fill="currentColor" viewBox="0 0 20 20">
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

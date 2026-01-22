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
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Geswipte Bücher</p>
            <p className="text-white text-3xl font-bold">127</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Gelikte Bücher</p>
            <p className="text-white text-3xl font-bold">12</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <h3 className="text-white text-xl font-bold mb-4">Empfohlen für dich</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center gap-4">
                <div className="w-12 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg"></div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1">Buchtitel {i}</h4>
                  <p className="text-white/70 text-sm">Autor Name</p>
                </div>
                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-30 bg-[#0F0E5F]/50 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-8 py-4">
          <button className="flex flex-col items-center gap-1">
            <svg className="w-7 h-7 text-[#D69A2C]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </button>

          <button onClick={() => router.push('/library')} className="flex flex-col items-center gap-1 transition-all hover:scale-110">
            <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>

          <button onClick={() => router.push('/profile')} className="flex flex-col items-center gap-1 transition-all hover:scale-110">
            <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          <button onClick={() => router.push('/settings')} className="flex flex-col items-center gap-1 transition-all hover:scale-110">
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

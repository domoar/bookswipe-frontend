'use client';

import { useRouter } from 'next/navigation';
import StarsBackground from '@/components/StarsBackground';

export default function PostSwipePage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-12">
        
        {/* First Section */}
        <div className="text-center mb-16">
          <h1 className="text-[#D69A2C] text-3xl font-bold mb-6 leading-tight">
            Du hast genug geswipt für heute!
          </h1>
          <p className="text-white/80 text-base leading-relaxed mb-3">
            Dein geistiger Fingerabdruck ist erfolgreich vermessen.
          </p>
          <p className="text-white/80 text-base leading-relaxed mb-3">
            Unser Algorithmus ist fleißig dabei,
          </p>
          <p className="text-white/80 text-base leading-relaxed">
            die emotional passendsten Titel für dich zu finden.
          </p>
        </div>

        {/* Recommendations Button */}
        <button
          onClick={() => router.push('/recommendations')}
          className="w-full max-w-sm bg-[#D69A2C] text-white text-lg font-bold py-5 rounded-full mb-6 hover:bg-[#C8922A] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
        >
          Deine Empfehlungen
        </button>

        {/* Results/Network Diagram Button */}
        <button
          onClick={() => router.push('/results')}
          className="w-full max-w-sm bg-white/10 backdrop-blur-sm border-2 border-[#D69A2C] text-white text-lg font-bold py-5 rounded-full mb-20 hover:bg-white/20 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Dein Geistiges Profil
        </button>

        {/* Second Section */}
        <div className="text-center mb-8">
          <h2 className="text-[#D69A2C] text-2xl font-bold mb-5 leading-tight">
            Du willst nicht warten und tiefer in die Welt der Zitate und Bücher eintauchen?
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-2">
            Sichere dir jetzt das Premium-Abo
          </p>
          <p className="text-white/80 text-base leading-relaxed mb-2">
            und erkunde das unendliche
          </p>
          <p className="text-white/80 text-base leading-relaxed">
            Universum unseres Bücheruniversum! zu finden.
          </p>
        </div>

        {/* Premium Button */}
        <button
          onClick={() => router.push('/subscription')}
          className="w-full max-w-sm bg-[#D69A2C] text-white text-lg font-bold py-5 rounded-full hover:bg-[#C8922A] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
        >
          BookSwipe Premium Kaufen
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-30 bg-[#0F0E5F]/50 backdrop-blur-xl border-t border-white/10">
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

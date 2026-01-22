'use client';

import { useRouter } from 'next/navigation';
import StarsBackground from '@/components/StarsBackground';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Top Bar */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-4 pb-2">
        <h1 className="text-white text-2xl font-bold">Profil</h1>
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 px-6 py-4 pb-24 overflow-y-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D69A2C] to-[#C8922A] flex items-center justify-center mb-4">
            <span className="text-white text-4xl font-bold">JD</span>
          </div>
          <h2 className="text-white text-2xl font-bold mb-1">John Doe</h2>
          <p className="text-white/70 text-sm mb-4">john.doe@example.com</p>
          
          <button className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20">
            Profil bearbeiten
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
            <p className="text-white text-2xl font-bold mb-1">127</p>
            <p className="text-white/70 text-xs">Geswipte</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
            <p className="text-white text-2xl font-bold mb-1">12</p>
            <p className="text-white/70 text-xs">Gelikte</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
            <p className="text-white text-2xl font-bold mb-1">5</p>
            <p className="text-white/70 text-xs">Gelesen</p>
          </div>
        </div>

        {/* Reading Preferences */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-3">Lesevorlieben</h3>
          <div className="flex flex-wrap gap-2">
            {['Fantasy', 'Thriller', 'Romance', 'Science Fiction', 'Mystery'].map((genre) => (
              <span key={genre} className="px-4 py-2 bg-[#D69A2C]/30 border border-[#D69A2C] rounded-full text-white text-sm">
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-3">Letzte Aktivität</h3>
          <div className="space-y-3">
            {[
              { action: 'Buch geliket', book: 'Der große Gatsby', time: 'Vor 2 Stunden' },
              { action: 'Buch abgelehnt', book: 'Lorem Ipsum', time: 'Vor 5 Stunden' },
              { action: 'Buch geliket', book: 'To Kill a Mockingbird', time: 'Gestern' },
            ].map((activity, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm mb-1">{activity.action}</p>
                    <p className="text-white/70 text-sm">{activity.book}</p>
                  </div>
                  <p className="text-white/50 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-white text-lg font-bold mb-3">Erfolge</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '🏆', title: 'Erste Schritte', desc: '10 Bücher geswipt' },
              { icon: '📚', title: 'Bücherwurm', desc: '50 Bücher geswipt' },
              { icon: '❤️', title: 'Romantiker', desc: '5 Romance-Bücher geliket' },
            ].map((achievement, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-white text-xs font-bold mb-1">{achievement.title}</p>
                <p className="text-white/60 text-[10px]">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-30 bg-[#0F0E5F]/50 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-8 py-4">
          <button onClick={() => router.push('/home')} className="flex flex-col items-center gap-1 transition-all hover:scale-110">
            <svg className="w-7 h-7 text-white/50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </button>

          <button onClick={() => router.push('/library')} className="flex flex-col items-center gap-1 transition-all hover:scale-110">
            <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>

          <button className="flex flex-col items-center gap-1">
            <svg className="w-7 h-7 text-[#D69A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

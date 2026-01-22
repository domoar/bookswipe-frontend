'use client';

import { useRouter } from 'next/navigation';
import StarsBackground from '@/components/StarsBackground';

const plans = [
  {
    name: 'Premium',
    price: '5.99',
    color: '#D69A2C',
    features: ['50 Tägliche Swipes'],
    popular: false
  },
  {
    name: 'Gold',
    price: '7.99',
    color: '#D69A2C',
    features: ['100 Tägliche Swipes'],
    popular: true
  },
  {
    name: 'Platinum',
    price: '9.99',
    color: '#D69A2C',
    features: ['∞ Tägliche Swipes', 'Bessere Recommendations'],
    popular: false
  }
];

export default function SubscriptionPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Header */}
      <div className="relative z-30 px-6 pt-12 pb-6">
        <button onClick={() => router.back()} className="text-white mb-8">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-[#D69A2C] text-4xl font-bold mb-3 text-center">Abos</h1>
        <p className="text-white/70 text-center">
          Für alle die nicht genug von Büchern bekommen können.
        </p>
      </div>

      {/* Plans */}
      <div className="relative z-10 flex-1 px-6 space-y-5 pb-8">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className="bg-[#0F0E5F]/30 backdrop-blur-sm border-2 border-[#D69A2C] rounded-3xl p-5 relative overflow-hidden"
          >
            {/* Gold Label */}
            <div className="absolute top-5 left-5">
              <div className="bg-[#D69A2C] px-5 py-2 rounded-full">
                <span className="text-white font-bold text-base">
                  BookSwipe {plan.name}
                </span>
              </div>
            </div>

            {/* Price - Top Right */}
            <div className="absolute top-5 right-5 text-right">
              <span className="text-white text-2xl font-bold">{plan.price}</span>
              <span className="text-white/90 text-base">/Monat</span>
            </div>

            {/* Features - Bottom Left */}
            <div className="mt-16 space-y-2">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-white font-medium text-base">{feature}</span>
                </div>
              ))}
            </div>

            {/* Checkmark Icon - Bottom Right */}
            <div className="absolute bottom-5 right-5">
              <div className="w-7 h-7 rounded border-2 border-white/40 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
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

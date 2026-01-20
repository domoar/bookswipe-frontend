'use client';

import { useEffect } from 'react';
import StarsBackground from './StarsBackground';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB]">
      <StarsBackground />
      
      <div className="relative z-10 animate-fadeIn">
        <div className="flex h-[200px] w-[200px] items-center justify-center rounded-3xl bg-gradient-to-br from-[#D69A2C] to-[#C8922A] shadow-2xl">
          <div className="text-center">
            <h1 className="mb-2 font-serif text-5xl font-bold text-white">
              Book
            </h1>
            <h1 className="font-serif text-5xl font-bold text-white">
              Swipe
            </h1>
            <div className="mt-4 text-6xl">📖</div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import StarsBackground from './StarsBackground';

interface IntroductionScreenProps {
  onContinue: () => void;
}

export default function IntroductionScreen({ onContinue }: IntroductionScreenProps) {
  const [sparkles, setSparkles] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100 - 50,
      y: -Math.random() * 60 - 20,
      delay: Math.random() * 2,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] px-6">
      <StarsBackground />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Book with Sparkles */}
        <div className="relative mb-12">
          {/* Sparkles */}
          {sparkles.map((sparkle, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-0 h-2 w-2 animate-sparkle rounded-full bg-white"
              style={{
                transform: `translate(${sparkle.x}px, ${sparkle.y}px)`,
                animationDelay: `${sparkle.delay}s`,
                opacity: 0,
              }}
            />
          ))}

          {/* Open Book */}
          <div className="relative">
            <div className="h-[200px] w-[280px] rounded-lg bg-gradient-to-br from-[#D69A2C] to-[#B8822A] shadow-2xl">
              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-[#A67A26]" />
              
              <div className="absolute left-0 top-0 h-full w-[138px] rounded-l-lg bg-gradient-to-r from-[#F5E6D3] to-[#E8D4BA]">
                <div className="p-6">
                  <div className="mb-2 h-2 w-20 rounded bg-[#0F0E5F]/20" />
                  <div className="mb-2 h-2 w-24 rounded bg-[#0F0E5F]/20" />
                  <div className="mb-2 h-2 w-16 rounded bg-[#0F0E5F]/20" />
                </div>
              </div>
              
              <div className="absolute right-0 top-0 h-full w-[138px] rounded-r-lg bg-gradient-to-l from-[#F5E6D3] to-[#E8D4BA]">
                <div className="p-6">
                  <div className="mb-2 h-2 w-20 rounded bg-[#0F0E5F]/20" />
                  <div className="mb-2 h-2 w-24 rounded bg-[#0F0E5F]/20" />
                  <div className="mb-2 h-2 w-16 rounded bg-[#0F0E5F]/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mb-4 max-w-sm font-serif text-2xl font-bold leading-relaxed text-white">
          Starte noch heute
          <br />
          deine Bücherreise
          <br />
          mit uns.
        </h2>

        <button
          onClick={onContinue}
          className="mt-8 rounded-full bg-gradient-to-r from-[#D69A2C] to-[#C8922A] px-16 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}

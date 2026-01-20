'use client';

import { useState, useEffect } from 'react';
import StarsBackground from './StarsBackground';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] px-6">
      <StarsBackground />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Circles */}
        <div className="relative mb-16 h-[350px] w-[350px]">
          {/* Connecting Lines */}
          <svg className="absolute inset-0 h-full w-full" style={{ opacity: animated ? 1 : 0, transition: 'opacity 1s ease-in-out 0.5s' }}>
            <path
              d="M 175 80 Q 120 140 100 180"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M 175 80 Q 230 140 250 180"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>

          {/* Top Circle - Single Book */}
          <div
            className="absolute left-1/2 top-0 flex h-[120px] w-[120px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl transition-all duration-1000"
            style={{
              transform: animated ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, -50px) scale(0.5)',
              opacity: animated ? 1 : 0,
            }}
          >
            <div className="text-6xl">📖</div>
          </div>

          {/* Bottom Left Circle - Stack of Books */}
          <div
            className="absolute bottom-0 left-0 flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl transition-all duration-1000"
            style={{
              transform: animated ? 'scale(1)' : 'scale(0.5)',
              opacity: animated ? 1 : 0,
              transitionDelay: '0.2s',
            }}
          >
            <div className="text-5xl">📚</div>
          </div>

          {/* Bottom Right Circle - Reading Person */}
          <div
            className="absolute bottom-0 right-0 flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl transition-all duration-1000"
            style={{
              transform: animated ? 'scale(1)' : 'scale(0.5)',
              opacity: animated ? 1 : 0,
              transitionDelay: '0.4s',
            }}
          >
            <div className="text-4xl">👤</div>
          </div>
        </div>

        {/* Weiter Button */}
        <button
          onClick={onStart}
          className="rounded-full bg-gradient-to-r from-[#D69A2C] to-[#C8922A] px-16 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.6s',
          }}
        >
          Weiter
        </button>
      </div>
    </div>
  );
}

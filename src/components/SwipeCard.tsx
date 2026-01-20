'use client';

import { useState, useRef, useEffect } from 'react';
import { Quote } from '@/types';

interface SwipeCardProps {
  quote: Quote;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

export default function SwipeCard({ quote, onSwipe, isTop }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (!isTop) return;
    setIsDragging(true);
    startPos.current = { x: clientX - position.x, y: clientY - position.y };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isTop) return;
    
    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    
    setPosition({ x: deltaX, y: deltaY });
    setRotation(deltaX * 0.1); // Rotate based on horizontal movement
  };

  const handleEnd = () => {
    if (!isDragging || !isTop) return;
    setIsDragging(false);

    const threshold = 100; // Swipe threshold in pixels
    
    if (Math.abs(position.x) > threshold) {
      // Complete the swipe
      const direction = position.x > 0 ? 'right' : 'left';
      
      // Animate off screen
      setPosition({
        x: position.x > 0 ? 1000 : -1000,
        y: position.y
      });
      
      setTimeout(() => {
        onSwipe(direction);
        // Reset position for next card
        setPosition({ x: 0, y: 0 });
        setRotation(0);
      }, 300);
    } else {
      // Reset position
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    // Add event listeners to window
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, position, isTop]);

  const opacity = isTop ? 1 : 0.5;
  const scale = isTop ? 1 : 0.95;
  const zIndex = isTop ? 20 : 10;

  // Show like/nope overlay based on swipe direction
  const showLike = position.x > 50;
  const showNope = position.x < -50;

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="absolute select-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
        transition: isDragging ? 'none' : 'all 0.3s ease-out',
        opacity,
        zIndex,
        cursor: isTop ? (isDragging ? 'grabbing' : 'grab') : 'default',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <div className="relative h-[500px] w-[340px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Like/Nope Overlay */}
        {showLike && (
          <div className="pointer-events-none absolute left-8 top-8 z-10 rotate-12 rounded-xl border-4 border-green-500 bg-green-500/20 px-6 py-3 backdrop-blur-sm">
            <span className="text-3xl font-bold text-green-500">LIKE</span>
          </div>
        )}
        {showNope && (
          <div className="pointer-events-none absolute right-8 top-8 z-10 -rotate-12 rounded-xl border-4 border-red-500 bg-red-500/20 px-6 py-3 backdrop-blur-sm">
            <span className="text-3xl font-bold text-red-500">NOPE</span>
          </div>
        )}

        {/* Card Content */}
        <div className="pointer-events-none flex h-full flex-col justify-between p-8">
          {/* Quote Text */}
          <div className="flex flex-1 items-center justify-center">
            <p className="text-center font-serif text-2xl leading-relaxed text-gray-800">
              "{quote.text}"
            </p>
          </div>

          {/* Author & Mood Tags */}
          <div className="space-y-4">
            <p className="text-center text-lg font-semibold text-gray-700">
              — {quote.author}
            </p>

            {/* Mood Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {quote.mood.map((mood, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gradient-to-r from-[#0F0E5F] to-[#155099] px-4 py-1.5 text-sm text-white"
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

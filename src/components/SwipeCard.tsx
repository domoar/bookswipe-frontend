'use client';

import { useState, useRef, useEffect } from 'react';
import { Book } from '@/services/api';

interface SwipeCardProps {
  book: Book;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

export default function SwipeCard({ book, onSwipe, isTop }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
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
  const likeOpacity = Math.max(0, Math.min(1, position.x / 100));
  const nopeOpacity = Math.max(0, Math.min(1, -position.x / 100));

  const nextQuote = () => {
    if (currentQuoteIndex < book.quotes.length - 1) {
      setCurrentQuoteIndex(currentQuoteIndex + 1);
    }
  };

  const prevQuote = () => {
    if (currentQuoteIndex > 0) {
      setCurrentQuoteIndex(currentQuoteIndex - 1);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="absolute select-none w-full h-full"
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
      <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-gradient-to-br from-gray-600 to-gray-800 shadow-2xl">
        
        {/* Quote Section - Top */}
        <div className="absolute top-0 left-0 right-0 h-[65%] flex items-center justify-center p-8 bg-gradient-to-b from-gray-500/40 to-transparent">
          <p className="text-white text-2xl font-serif leading-relaxed text-center pointer-events-none">
            &ldquo;{book.quotes[currentQuoteIndex].text}&rdquo;
          </p>
          
          {/* Quote Navigation Dots */}
          {book.quotes.length > 1 && (
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-2">
              {book.quotes.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all ${
                    index === currentQuoteIndex
                      ? 'w-8 bg-white'
                      : 'w-1 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Left/Right tap areas for navigation */}
          {book.quotes.length > 1 && isTop && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevQuote();
                }}
                className="absolute left-0 top-0 bottom-[35%] w-1/3 pointer-events-auto"
                style={{ background: 'transparent' }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextQuote();
                }}
                className="absolute right-0 top-0 bottom-[35%] w-1/3 pointer-events-auto"
                style={{ background: 'transparent' }}
              />
            </>
          )}
        </div>

        {/* Book Info Section - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pb-8 pointer-events-none">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white text-2xl font-serif font-bold mb-1">
                {book.title}
              </h3>
              <p className="text-white/80 text-sm mb-1">
                {book.author}, {book.year}
              </p>
              <p className="text-white/60 text-sm uppercase tracking-wide">
                {book.genre} • {book.subGenres.slice(0, 2).join(' • ')}
              </p>
            </div>
            
            {/* Info Button */}
            <button 
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Show book info:', book);
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D69A2C] to-[#C8922A]" />

        {/* LIKE Overlay */}
        {isTop && (
          <div
            className="absolute top-12 left-12 px-6 py-3 rounded-2xl bg-green-500 rotate-[-20deg] pointer-events-none"
            style={{ opacity: likeOpacity }}
          >
            <span className="text-white text-4xl font-black">LIKE</span>
          </div>
        )}

        {/* NOPE Overlay */}
        {isTop && (
          <div
            className="absolute top-12 right-12 px-6 py-3 rounded-2xl bg-red-500 rotate-[20deg] pointer-events-none"
            style={{ opacity: nopeOpacity }}
          >
            <span className="text-white text-4xl font-black">NOPE</span>
          </div>
        )}
      </div>
    </div>
  );
}

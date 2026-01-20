'use client';

import { useState } from 'react';
import StarsBackground from './StarsBackground';

interface UserDataScreenProps {
  onComplete: (data: { name: string; email: string; age: string }) => void;
  onSkip: () => void;
}

export default function UserDataScreen({ onComplete, onSkip }: UserDataScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] px-6 py-12">
      <StarsBackground />

      <div className="relative z-10 w-full max-w-sm">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#D69A2C] to-[#C8922A]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-center font-serif text-3xl font-bold text-[#D69A2C]">
          Nutzer-Account erstellen
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-center text-sm leading-relaxed text-white/90">
          Wir würden gerne mehr über dich erfahren,
          <br />
          um dich auf deinem Weg zu deinem
          <br />
          nächsten Lieblingsbuch zu begleiten.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-full border-2 border-white/30 bg-white/10 px-6 py-4 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 focus:border-[#D69A2C] focus:bg-white/20 focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="E-Mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-full border-2 border-white/30 bg-white/10 px-6 py-4 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 focus:border-[#D69A2C] focus:bg-white/20 focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Alter"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full rounded-full border-2 border-white/30 bg-white/10 px-6 py-4 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 focus:border-[#D69A2C] focus:bg-white/20 focus:outline-none"
              required
              min="1"
              max="120"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#D69A2C] to-[#C8922A] px-6 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Weiter
          </button>
        </form>

        <button
          onClick={onSkip}
          className="mt-4 w-full rounded-full border-2 border-white/40 bg-white/10 px-6 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
        >
          Überspringen
        </button>
      </div>

      <div />
    </div>
  );
}

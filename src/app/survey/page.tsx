'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StarsBackground from '@/components/StarsBackground';

const genres = [
  'Fantasy', 'Science Fiction', 'Thriller', 'Krimi', 'Romance', 'Drama',
  'Klassiker', 'Dystopie', 'Horror', 'Historisch', 'Philosophie', 'Biographie'
];

const readingHabits = [
  'Täglich', 'Mehrmals pro Woche', 'Wöchentlich', 'Monatlich', 'Gelegentlich'
];

const moods = [
  'Entspannung', 'Spannung', 'Lernen', 'Inspiration', 'Unterhaltung', 'Eskapismus'
];

export default function UserSurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [readingHabit, setReadingHabit] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [age, setAge] = useState('');

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save preferences to localStorage
      const userPreferences = {
        genres: selectedGenres,
        readingHabit,
        moods: selectedMoods,
        age,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
      router.push('/swipe');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedGenres.length >= 3;
      case 2:
        return readingHabit !== '';
      case 3:
        return selectedMoods.length >= 2;
      case 4:
        return age !== '';
      default:
        return false;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Top Bar */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-4 pb-2">
        <button onClick={() => step > 1 && setStep(step - 1)} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === step ? 'bg-[#D69A2C]' : i < step ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        <button onClick={() => router.push('/swipe')} className="text-white/70 text-sm">
          Überspringen
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 py-8 overflow-y-auto">
        {/* Step 1: Genre Preferences */}
        {step === 1 && (
          <div className="flex-1">
            <h1 className="text-white text-3xl font-bold mb-3">
              Welche Genres interessieren dich?
            </h1>
            <p className="text-white/70 mb-8">Wähle mindestens 3 Genres aus</p>

            <div className="grid grid-cols-2 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    selectedGenres.includes(genre)
                      ? 'bg-[#D69A2C] border-[#D69A2C] text-white'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="font-medium">{genre}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Reading Habits */}
        {step === 2 && (
          <div className="flex-1">
            <h1 className="text-white text-3xl font-bold mb-3">
              Wie oft liest du?
            </h1>
            <p className="text-white/70 mb-8">Wähle deine Lesegewohnheit</p>

            <div className="space-y-3">
              {readingHabits.map((habit) => (
                <button
                  key={habit}
                  onClick={() => setReadingHabit(habit)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    readingHabit === habit
                      ? 'bg-[#D69A2C] border-[#D69A2C] text-white'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="font-medium text-lg">{habit}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Reading Moods */}
        {step === 3 && (
          <div className="flex-1">
            <h1 className="text-white text-3xl font-bold mb-3">
              Warum liest du?
            </h1>
            <p className="text-white/70 mb-8">Wähle mindestens 2 Gründe</p>

            <div className="grid grid-cols-2 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    selectedMoods.includes(mood)
                      ? 'bg-[#D69A2C] border-[#D69A2C] text-white'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="font-medium">{mood}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Age */}
        {step === 4 && (
          <div className="flex-1">
            <h1 className="text-white text-3xl font-bold mb-3">
              Wie alt bist du?
            </h1>
            <p className="text-white/70 mb-8">Hilft uns, bessere Empfehlungen zu geben</p>

            <div className="space-y-3">
              {['Unter 18', '18-25', '26-35', '36-45', '46-60', 'Über 60'].map((ageRange) => (
                <button
                  key={ageRange}
                  onClick={() => setAge(ageRange)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    age === ageRange
                      ? 'bg-[#D69A2C] border-[#D69A2C] text-white'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="font-medium text-lg">{ageRange}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="relative z-30 px-6 pb-8">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
            canProceed()
              ? 'bg-[#D69A2C] text-white hover:bg-[#C8922A]'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          {step === 4 ? 'Fertig' : 'Weiter'}
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StarsBackground from '@/components/StarsBackground';

const genres = [
  'Kriminalromane', 'Science-Fiction', 'Thriller', 'Liebesromane',
  'Biografien', 'Geschichtsromane', 'Meine Story', 'Horror'
];

const interests = [
  'Klassiker', 'Philosophie', 'Reisen', 'Sport',
  'Musik', 'Kunst', 'Wissenschaft', 'Politik'
];

export default function UserSurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [ageGroup, setAgeGroup] = useState('');

  const totalSteps = 4;

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save preferences to localStorage
      const userPreferences = {
        gender,
        genres: selectedGenres,
        interests: selectedInterests,
        ageGroup,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
      router.push('/swipe');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return gender !== '';
      case 2:
        return selectedGenres.length > 0;
      case 3:
        return ageGroup !== '';
      case 4:
        return selectedInterests.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] overflow-hidden">
      <StarsBackground />

      {/* Top Bar with Progress */}
      <div className="relative z-30 px-6 pt-12 pb-6">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : router.push('/introduction')} 
          className="text-white mb-6"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#D69A2C] transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 py-4 overflow-y-auto">
        
        {/* Step 1: Gender Selection */}
        {step === 1 && (
          <div className="flex-1 flex flex-col">
            <h1 className="text-[#D69A2C] text-2xl font-bold mb-2">
              Was ist dein Geschlecht?
            </h1>
            <p className="text-white/60 text-sm mb-12">
              Wähle dein Geschlecht aus
            </p>

            <div className="flex-1 flex flex-col justify-center items-center gap-8 pb-20">
              <button
                onClick={() => setGender('male')}
                className={`w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                  gender === 'male'
                    ? 'bg-[#D69A2C] scale-110 shadow-2xl shadow-[#D69A2C]/50'
                    : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                }`}
              >
                <svg className={`w-16 h-16 mb-2 ${gender === 'male' ? 'text-white' : 'text-white/70'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span className={`text-lg font-semibold ${gender === 'male' ? 'text-white' : 'text-white/70'}`}>
                  Männlich
                </span>
              </button>

              <button
                onClick={() => setGender('female')}
                className={`w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                  gender === 'female'
                    ? 'bg-[#D69A2C] scale-110 shadow-2xl shadow-[#D69A2C]/50'
                    : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                }`}
              >
                <svg className={`w-16 h-16 mb-2 ${gender === 'female' ? 'text-white' : 'text-white/70'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span className={`text-lg font-semibold ${gender === 'female' ? 'text-white' : 'text-white/70'}`}>
                  Weiblich
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Genre Selection */}
        {step === 2 && (
          <div className="flex-1 flex flex-col">
            <h1 className="text-[#D69A2C] text-2xl font-bold mb-2">
              Welche Genres interessieren dich?
            </h1>
            <p className="text-white/60 text-sm mb-8">
              Wähle deine Präferenzen aus
            </p>

            <div className="grid grid-cols-2 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedGenres.includes(genre)
                      ? 'bg-[#D69A2C] text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {selectedGenres.includes(genre) && (
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                  <span className="font-medium text-center">{genre}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Age Group Selection */}
        {step === 3 && (
          <div className="flex-1 flex flex-col">
            <h1 className="text-[#D69A2C] text-2xl font-bold mb-2">
              Wie alt bist du?
            </h1>
            <p className="text-white/60 text-sm mb-8">
              Bitte gebe dein Alter an
            </p>

            <div className="space-y-3 overflow-y-auto">
              {['Unter 18', '18-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60', '61-65', '66-70', 'Über 70'].map((ageRange) => (
                <button
                  key={ageRange}
                  onClick={() => setAgeGroup(ageRange)}
                  className={`w-full p-5 rounded-2xl transition-all duration-300 text-center ${
                    ageGroup === ageRange
                      ? 'bg-[#D69A2C] text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <span className={`text-xl font-semibold ${ageGroup === ageRange ? 'font-bold' : ''}`}>
                    {ageRange}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Interests Selection */}
        {step === 4 && (
          <div className="flex-1 flex flex-col">
            <h1 className="text-[#D69A2C] text-2xl font-bold mb-2">
              Was interessiert dich?
            </h1>
            <p className="text-white/60 text-sm mb-8">
              Erzähle uns etwas über deine Hobbies und Interessen
            </p>

            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedInterests.includes(interest)
                      ? 'bg-[#D69A2C] text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {selectedInterests.includes(interest) && (
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                  <span className="font-medium text-center">{interest}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="relative z-30 px-6 pb-8 pt-4">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
            canProceed()
              ? 'bg-[#D69A2C] text-white hover:bg-[#C8922A] active:scale-95 shadow-lg'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          Fortfahren
        </button>
      </div>
    </div>
  );
}

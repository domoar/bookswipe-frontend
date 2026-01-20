'use client';

import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import WelcomeScreen from '@/components/WelcomeScreen';
import IntroductionScreen from '@/components/IntroductionScreen';
import LoginScreen from '@/components/LoginScreen';
import UserDataScreen from '@/components/UserDataScreen';
import SwipeInterface from '@/components/SwipeInterface';
import { Quote } from '@/types';

type AppState = 'splash' | 'welcome' | 'introduction' | 'login' | 'userData' | 'swiping';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [userData, setUserData] = useState<{ name: string; email: string; age: string } | null>(null);

  // Mock quotes - replace with API call later
  const mockQuotes: Quote[] = [
    {
      id: '1',
      text: 'Es ist nicht genug zu wissen, man muss auch anwenden. Es ist nicht genug zu wollen, man muss auch tun.',
      author: 'Johann Wolfgang von Goethe',
      mood: ['Inspirierend', 'Motivierend']
    },
    {
      id: '2',
      text: 'Das Leben ist wie Fahrradfahren. Um die Balance zu halten, musst du in Bewegung bleiben.',
      author: 'Albert Einstein',
      mood: ['Philosophisch', 'Lebensweisheit']
    },
    {
      id: '3',
      text: 'Die einzige Art, großartige Arbeit zu leisten, ist zu lieben, was man tut.',
      author: 'Steve Jobs',
      mood: ['Motivierend', 'Karriere']
    },
    {
      id: '4',
      text: 'In der Mitte von Schwierigkeiten liegen die Möglichkeiten.',
      author: 'Albert Einstein',
      mood: ['Hoffnungsvoll', 'Überwindung']
    },
    {
      id: '5',
      text: 'Das Glück deines Lebens hängt von der Beschaffenheit deiner Gedanken ab.',
      author: 'Marcus Aurelius',
      mood: ['Philosophisch', 'Selbstreflexion']
    },
    {
      id: '6',
      text: 'Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.',
      author: 'Bertolt Brecht',
      mood: ['Motivierend', 'Kampfgeist']
    },
    {
      id: '7',
      text: 'Das Leben ist zu kurz, um schlechten Wein zu trinken.',
      author: 'Johann Wolfgang von Goethe',
      mood: ['Lebensfreude', 'Genuss']
    },
    {
      id: '8',
      text: 'Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.',
      author: 'Eleanor Roosevelt',
      mood: ['Hoffnungsvoll', 'Träumerisch']
    }
  ];

  const handleSplashComplete = () => {
    setAppState('welcome');
  };

  const handleWelcomeStart = () => {
    setAppState('introduction');
  };

  const handleIntroductionContinue = () => {
    setAppState('login');
  };

  const handleLogin = (method: 'facebook' | 'google') => {
    console.log(`Logging in with ${method}`);
    setAppState('userData');
  };

  const handleLoginSkip = () => {
    setAppState('userData');
  };

  const handleUserDataComplete = (data: { name: string; email: string; age: string }) => {
    setUserData(data);
    setAppState('swiping');
  };

  const handleUserDataSkip = () => {
    setAppState('swiping');
  };

  const handleSwipeComplete = (liked: Quote[]) => {
    console.log('Liked quotes:', liked);
    console.log('User data:', userData);
    // TODO: Send to backend and show results
  };

  return (
    <>
      {appState === 'splash' && <SplashScreen onComplete={handleSplashComplete} />}
      {appState === 'welcome' && <WelcomeScreen onStart={handleWelcomeStart} />}
      {appState === 'introduction' && <IntroductionScreen onContinue={handleIntroductionContinue} />}
      {appState === 'login' && <LoginScreen onLogin={handleLogin} onSkip={handleLoginSkip} />}
      {appState === 'userData' && (
        <UserDataScreen onComplete={handleUserDataComplete} onSkip={handleUserDataSkip} />
      )}
      {appState === 'swiping' && <SwipeInterface quotes={mockQuotes} onComplete={handleSwipeComplete} />}
    </>
  );
}
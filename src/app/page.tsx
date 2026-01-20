'use client';

import { useState } from 'react';
import SwipeInterface from '@/components/SwipeInterface';
import { Quote } from '@/types';

export default function Home() {
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

  const handleSwipeComplete = (liked: Quote[]) => {
    console.log('Liked quotes:', liked);
    // TODO: Show results or restart
  };

  return <SwipeInterface quotes={mockQuotes} onComplete={handleSwipeComplete} />;
}
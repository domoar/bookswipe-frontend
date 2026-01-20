'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/SplashScreen';

export default function SplashPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/welcome');
  };

  return <SplashScreen onComplete={handleComplete} />;
}

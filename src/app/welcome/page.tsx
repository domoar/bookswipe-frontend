'use client';

import { useRouter } from 'next/navigation';
import WelcomeScreen from '@/components/WelcomeScreen';

export default function WelcomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/introduction');
  };

  return <WelcomeScreen onStart={handleStart} />;
}

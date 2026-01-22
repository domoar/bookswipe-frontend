'use client';

import { useRouter } from 'next/navigation';
import IntroductionScreen from '@/components/IntroductionScreen';

export default function IntroductionPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/survey');
  };

  return <IntroductionScreen onContinue={handleContinue} />;
}

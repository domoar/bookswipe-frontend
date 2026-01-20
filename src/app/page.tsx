'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to splash screen on app load
    router.push('/splash');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0E5FDE] to-[#155099EB] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D69A2C]"></div>
    </div>
  );
}
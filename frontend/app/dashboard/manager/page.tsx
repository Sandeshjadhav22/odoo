'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser } from '@/lib/auth';

export default function ManagerDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = getLoggedInUser();
    if (user?.role !== 'manager') {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Manager Dashboard
      </h2>
      <p className="mt-2">
        View team performance and analytics.
      </p>
    </div>
  );
}

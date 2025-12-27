'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser } from '@/lib/auth';

export default function TechnicianDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = getLoggedInUser();
    if (user?.role !== 'technician') {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Technician Dashboard
      </h2>
      <p className="mt-2">
        View assigned tasks and work orders.
      </p>
    </div>
  );
}

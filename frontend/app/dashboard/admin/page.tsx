'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser } from '@/lib/auth';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = getLoggedInUser();
    if (user?.role !== 'admin') {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="mt-2">
        Manage users, system settings, reports.
      </p>
    </div>
  );
}

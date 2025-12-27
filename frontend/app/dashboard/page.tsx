'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/authApi';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
    }

    loadUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Dashboard Home
      </h1>

      <p className="mt-2">
        Logged in as{' '}
        <strong>{user.name}</strong>
      </p>

      <p className="text-sm text-gray-600">
        Role: {user.role}
      </p>
    </div>
  );
}

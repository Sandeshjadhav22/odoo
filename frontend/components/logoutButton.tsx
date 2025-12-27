'use client';

import { useRouter } from 'next/navigation';
import { logoutApi } from '@/lib/authApi';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutApi();       // clears httpOnly cookie
      router.push('/login');   // redirect to login
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 hover:underline"
    >
      Logout
    </button>
  );
}

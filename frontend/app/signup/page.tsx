'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getUsers,
  saveUsers,
  UserRole,
} from '@/lib/portalUserStore';
import { isValidPassword } from '@/lib/passwordValidator';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('technician');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        'Password must be 8+ chars, include uppercase, lowercase & special character'
      );
      return;
    }

    const users = getUsers();

    if (users.find((u) => u.email === email)) {
      setError('Email already exists');
      return;
    }

    users.push({
      name,
      email,
      role,
      password,
    });

    saveUsers(users);
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-96 border p-6 rounded space-y-4">
        <h2 className="text-xl font-bold">Sign Up</h2>

        {/* Name */}
        <input
          className="w-full border p-2"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Role */}
        <select
          className="w-full border p-2"
          value={role}
          onChange={(e) =>
            setRole(e.target.value as UserRole)
          }
        >
          <option value="technician">
            Technician (default)
          </option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>

        {/* Password */}
        <input
          type="password"
          className="w-full border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <input
          type="password"
          className="w-full border p-2"
          placeholder="Re-enter Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white p-2"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

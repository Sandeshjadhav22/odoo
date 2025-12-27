"use client";

import { useState } from "react";
import Link from "next/link";
import { getUsers } from "@/lib/portalUserStore";
import { setLoggedInUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const users = getUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      setError("Account not exist");
      return;
    }

    if (user.password !== password) {
      setError("Invalid Password");
      return;
    }

    setError("");

    // store logged-in user
    setLoggedInUser(user);

    // redirect based on role
    if (user.role === "admin") {
      router.push("/dashboard/admin");
    } else if (user.role === "technician") {
      router.push("/dashboard/technician");
    } else if (user.role === "manager") {
      router.push("/dashboard/manager");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-96 border p-6 rounded space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          className="w-full border p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2"
        >
          Login
        </button>

        <div className="flex justify-between text-sm">
          <Link href="/signup">Sign Up</Link>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

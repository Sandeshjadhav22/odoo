const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL!;

// -------- SIGNUP --------
export async function signupApi(payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 🔴 REQUIRED
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Signup failed');
  }

  return data;
}

// -------- LOGIN --------
export async function loginApi(payload: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 🔴 REQUIRED
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}

// -------- LOGOUT --------
export async function logoutApi() {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

// -------- CHECK AUTH --------
export async function getCurrentUser() {
  const res = await fetch(`${API_BASE_URL}/protected`, {
    credentials: 'include',
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
}

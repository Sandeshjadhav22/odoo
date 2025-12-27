export type UserRole = 'admin' | 'technician' | 'manager';

export type PortalUser = {
  name: string;
  email: string;
  role: UserRole;
  password: string;
};

const STORAGE_KEY = 'portal_users';

export function getUsers(): PortalUser[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function saveUsers(users: PortalUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

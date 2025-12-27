import { PortalUser } from './portalUserStore';

const LOGGED_IN_USER_KEY = 'logged_in_user';

export function setLoggedInUser(user: PortalUser) {
  localStorage.setItem(
    LOGGED_IN_USER_KEY,
    JSON.stringify(user)
  );
}

export function getLoggedInUser(): PortalUser | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(LOGGED_IN_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function logout() {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
}

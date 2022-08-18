import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Check if firebase admin env vars are set in .env
if (
  !import.meta.env.VITE_ADMIN_PROJECT_ID ||
  !import.meta.env.VITE_ADMIN_CLIENT_EMAIL ||
  !import.meta.env.VITE_ADMIN_PRIVATE_KEY
) {
  throw new Error('Firebase Admin environment variables are not set!');
}

// Get credentials for the admin app
const adminConfig = {
  credential: cert({
    projectId: import.meta.env.VITE_ADMIN_PROJECT_ID,
    clientEmail: import.meta.env.VITE_ADMIN_CLIENT_EMAIL,
    privateKey: import.meta.env.VITE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
};

// Initialize new app or return an existing one
export const getAdminApp = () =>
  getApps().length ? getApp() : initializeApp(adminConfig);

// Verify users idToken
export const verifyIDToken = async (token: string) => {
  const auth = getAuth(getAdminApp());

  return await auth.verifyIdToken(token);
};

// Return a session cookie with credentials from firebase-admin
export const createSessionCookie = async (token: string, maxAge: number) => {
  const auth = getAuth(getAdminApp());
  const session = await auth.createSessionCookie(token, {
    expiresIn: maxAge * 1000,
  });

  return `session=${session}; SameSite=Strict; Path=/; HttpOnly; Secure; Max-Age=${maxAge}`;
};

// Return decoded idToken or null
export const getIdTokenFromSessionCookie = async (
  sesisonCookie: string | null
) => {
  if (!sesisonCookie) return null;
  const auth = getAuth(getAdminApp());

  return await auth.verifySessionCookie(sesisonCookie, true).catch(() => null);
};

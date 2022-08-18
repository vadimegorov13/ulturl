import { getIdTokenFromSessionCookie } from '$lib/firebase/admin';
import type { GetSession, Handle } from '@sveltejs/kit';

// Get specific cookie value
const getCookieValue = (cookie: string | null, name: string): string | null =>
  cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null;

// Need handle because multiple endpoint want to access user
export const handle: Handle = async ({ event, resolve }) => {
  const cookie = event.request.headers.get('cookie');

  event.locals.idToken = await getIdTokenFromSessionCookie(
    getCookieValue(cookie, 'session')
  );

  return resolve(event);
};

// Return session values
export const getSession: GetSession = ({ locals }) => {
  const user = locals.idToken
    ? {
        id: locals.idToken.sub,
        email: locals.idToken.email,
      }
    : null;

  return { user };
};

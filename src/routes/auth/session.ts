import { createSessionCookie, verifyIDToken } from '$lib/firebase/admin';
import type { RequestHandler } from '@sveltejs/kit';

const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

// POST auth/session
export const POST: RequestHandler = async ({ request }) => {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader)
    return {
      status: 401,
      body: 'Invalid auth header',
    };

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token)
    return {
      status: 401,
      body: 'Invalid auth header',
    };

  try {
    const { sub, email } = await verifyIDToken(token);

    const user = { id: sub, email };
    const sesisonCookie = await createSessionCookie(token, SESSION_MAX_AGE);

    return {
      status: 200,
      body: user,
      headers: {
        'Set-Cookie': sesisonCookie,
      },
    };
  } catch {
    return {
      status: 401,
      body: 'Invalid auth token',
    };
  }
};

const expiredCookie =
  'session=; SameSite=Strict; Path=/; HttpOnly; Secure; Max-Age=0';

// Logout user by deleting session from cookies
// DELETE auth/session?_method=DELETE
export const DELETE: RequestHandler = () => {
  return {
    status: 200,
    headers: {
      'Set-Cookie': expiredCookie,
    },
  };
};

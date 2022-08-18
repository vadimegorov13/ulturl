import { session } from '$app/stores';
import type { User } from 'src/types';
import { derived, type Writable } from 'svelte/store';

// Derived store to access user from the Session
export const user = derived<Writable<App.Session>, User>(
  session,
  ($session, set) => {
    set($session.user);
  }
);

// Method to set user
export const setUser = (user: User | null) => {
  session.update(($session) => ({ ...$session, user }));
};

import type firebase from 'firebase/compat/app';
import { writable } from 'svelte/store';

const authStore = writable<{
  isLoggedIn: boolean;
  user?: firebase.User;
  firebaseController: boolean;
}>({
  isLoggedIn: false,
  firebaseController: false,
});

export default {
  subscribe: authStore.subscribe,
  set: authStore.set,
};

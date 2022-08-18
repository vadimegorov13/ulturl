import firebase from 'firebase/compat/app';
import {
  getAuth,
  sendSignInLinkToEmail,
  setPersistence,
  inMemoryPersistence,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';

if (
  !import.meta.env.VITE_API_KEY ||
  !import.meta.env.VITE_AUTH_DOMAIN ||
  !import.meta.env.VITE_PROJECT_ID
) {
  throw new Error('Firebase environment variables are not set!');
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
};

export const getClientApp = () => {
  if (firebase.apps.length) {
    return firebase.app();
  }

  firebase.initializeApp(firebaseConfig);

  const app = firebase.app();
  const auth = getAuth(app);
  setPersistence(auth, inMemoryPersistence);

  return app;
};

export const sendMagicLink = async (email: string, redirectUrl: string) => {
  const auth = getAuth(getClientApp());

  const actionCodeSettings = {
    url: redirectUrl,
    handleCodeInApp: true,
  };

  return await sendSignInLinkToEmail(auth, email, actionCodeSettings);
};

export const singInWithMagicLink = (email: string, link: string) => {
  const auth = getAuth(getClientApp());

  return signInWithEmailLink(auth, email, link);
};

export const isMagicLink = (link: string) => {
  const auth = getAuth(getClientApp());

  return isSignInWithEmailLink(auth, link);
};

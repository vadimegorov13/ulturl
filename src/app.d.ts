// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  import type { DecodedIdToken } from 'firebase-admin/auth';
  interface Locals {
    idToken: DecodedIdToken;
  }
  // interface Platform {}
  // interface PrivateEnv {}
  // interface PublicEnv {}
  interface Session {
    user: User | null;
  }
  // interface Stuff {}
}

<script>
  import { goto } from '$app/navigation';
  import authStore from '../lib/stores/authStore';
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';

  // Redirect if not logged in
  // authStore.subscribe(async ({ isLoggedIn, firebaseController }) => {
  //   console.log('subscribe');
  //   console.log(isLoggedIn, firebaseController);
  //   if (!isLoggedIn && !firebaseController) {
  //     await goto('/login');
  //   }
  // });

  // Logout
  const handleLogout = async () => {
    firebase.auth().signOut();
  };
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>

<div>
  {#if $authStore.isLoggedIn}
    <p>Logged in as {$authStore.user?.email}</p>
    <button on:click={handleLogout}>logout</button>
  {/if}
</div>

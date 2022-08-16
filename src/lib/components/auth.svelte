<script>
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';
  import { onMount } from 'svelte';
  import { firebaseConfig } from '../utils/firebaseConfig';
  import authStore from '../stores/authStore';

  onMount(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log('no user');
        return;
      }

      console.log('user saved');
      authStore.set({
        isLoggedIn: user !== null,
        user,
        firebaseController: true,
      });
    });
  });
</script>

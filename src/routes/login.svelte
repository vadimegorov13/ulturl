<script lang="ts">
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/auth';

  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      await firebase.auth().signInWithPopup(provider);
    } catch (error: unknown) {
      console.error(error);
    }
  };
</script>

<div>
  <h1>Login</h1>

  <button on:click={loginWithGoogle}>login with google</button>
</div>

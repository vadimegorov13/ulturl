<script lang="ts">
  import { isMagicLink, singInWithMagicLink } from '$lib/firebase/client';

  import Button from '$lib/components/buttons/Button.svelte';
  import PageContainer from '$lib/components/PageContainer.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import { onMount } from 'svelte';
  import { clearMagicEmail, getMagicEmail } from '$lib/localStorage/magicEmail';
  import { goto } from '$app/navigation';
  import { setUser } from '$lib/stores/user';

  type FormState = 'validating' | 'idle' | 'submitting' | 'success' | Error;

  let state: FormState = 'idle';
  let email: string | null = null;

  const login = async (magicEmail: string) => {
    state = 'submitting';
    email = magicEmail;

    try {
      const userCredential = await singInWithMagicLink(
        email,
        window.location.href
      );
      const token = await userCredential.user.getIdToken();

      const user = await fetch('/auth/session', {
        method: 'POST',
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      }).then((response) => response.json());

      clearMagicEmail();

      setUser(user);

      goto('/profile');
    } catch (error) {
      const typedError = error as Error;

      state = typedError;
    }
  };

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = async ({ currentTarget }) => {
    await login(new FormData(currentTarget).get('email') as string);
  };

  onMount(() => {
    if (!isMagicLink(window.location.href)) {
      state = new Error('Invalid magic link');
      return;
    }

    const magicEmail = getMagicEmail();

    if (!magicEmail) {
      state = 'idle';
      return;
    }

    login(magicEmail);
  });
</script>

<svelte:head>
  <title>Confim Login | UltUrl</title>
</svelte:head>

<PageContainer>
  {#if state === 'validating'}
    <p>Validating magic link...</p>
  {:else if state === 'submitting'}
    <p>We are signing you in as {email}</p>
  {:else if state instanceof Error}
    <p>Your link has expired {state}</p>
  {:else}
    <PageHeading>Confirm your email to login</PageHeading>
    <div class="grid grid-cols-12 gap-6 md:p-10">
      <form
        class="col-span-12 flex flex-col gap-6 lg:col-span-6"
        on:submit|preventDefault={handleSubmit}
      >
        <div class="md:w-full text-xl">
          <input
            type="email"
            name="email"
            placeholder="user@example.com"
            aria-label="email"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-secondary-400"
            required
          />
        </div>
        <Button>Finish login!</Button>
      </form>
    </div>
  {/if}
</PageContainer>

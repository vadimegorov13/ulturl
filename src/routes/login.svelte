<script lang="ts" context="module">
  export const load: Load = ({ session }) =>
    session.user ? { redirect: '/profile', status: 302 } : { status: 200 };
</script>

<script lang="ts">
  import { sendMagicLink } from '$lib/firebase/client';

  import Button from '$lib/components/buttons/Button.svelte';
  import PageContainer from '$lib/components/PageContainer.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import { setMagicEmail } from '$lib/localStorage/magicEmail';
  import type { Load } from '@sveltejs/kit';

  type FormState = 'idle' | 'submitting' | 'success' | Error;

  let state: FormState = 'idle';
  let email: string | null = null;

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = async ({ currentTarget }) => {
    state = 'submitting';
    email = new FormData(currentTarget).get('email') as string;
    const redirectUrl = `${window.location.origin}/auth/confirm`;

    try {
      await sendMagicLink(email, redirectUrl);
      setMagicEmail(email);
      state = 'success';
    } catch (error) {
      const typedError = error as Error;

      state = typedError;
    }
  };
</script>

<svelte:head>
  <title>Login | UltUrl</title>
</svelte:head>

<PageContainer>
  <PageHeading>Login</PageHeading>
  <div class="grid grid-cols-12 gap-6 md:p-10">
    {#if state !== 'success'}
      <div class="col-span-12 lg:col-span-6 text-2xl">
        <p>You are not logged in!</p>
        <p>
          Please enter your email to login, using
          <strong class="text-primary-400">
            Passwordless Authentication
          </strong>
        </p>
      </div>
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
        <Button>Send magic link</Button>
        {#if state === 'submitting'}
          <p>Sending email to {email}</p>
        {/if}

        {#if state instanceof Error}
          <p>There was an error sending your email... Please try again</p>
        {/if}
      </form>
    {:else}
      <div class="col-span-12">
        <p>Great, we've sent you an email!</p>
        <p>Please find it in your inbox and follow the link there to login.</p>
      </div>
    {/if}
  </div>
</PageContainer>

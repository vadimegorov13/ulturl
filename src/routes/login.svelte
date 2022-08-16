<script lang="ts">
  import Button from '$lib/components/buttons/Button.svelte';
  import PageContainer from '$lib/components/PageContainer.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';

  const handleSubmit: svelte.JSX.EventHandler<
    SubmitEvent,
    HTMLFormElement
  > = () => {
    console.log('yo');
  };
</script>

<svelte:head>
  <title>Login | UltUrl</title>
</svelte:head>

<PageContainer>
  <PageHeading>Login</PageHeading>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-6">
      <p>You are not logged in!</p>
      <p>
        Please enter your email to login, using
        <strong class="text-primary-400"> Passwordless Authentication </strong>
      </p>
    </div>
    <form
      class="col-span-12 flex flex-col gap-6 lg:col-span-6"
      on:submit|preventDefault={handleSubmit}
    >
      <div class="md:w-full">
        <input
          type="email"
          name="email"
          placeholder="example@ulturl.com"
          aria-label="email"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-secondary-400"
          required
        />
      </div>
      <Button>Send magic link</Button>
    </form>
  </div>
</PageContainer>

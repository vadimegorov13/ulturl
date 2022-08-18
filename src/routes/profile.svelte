<script lang="ts" context="module">
  export const load: Load = ({ session }) =>
    session.user ? { status: 200 } : { redirect: '/login', status: 302 };
</script>

<script lang="ts">
  import { setUser } from '$lib/stores/user';
  import { enhanceForm } from '$lib/actions/enhanceForm';
  import { goto } from '$app/navigation';
  import type { Load } from '@sveltejs/kit';
  import PageContainer from '$lib/components/PageContainer.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';

  const handleLogout = () => {
    setUser(null);
    goto('/');
  };
</script>

<PageContainer>
  <PageHeading>Profile</PageHeading>
  <p />
  <form
    method="POST"
    action="auth/session?_method=DELETE"
    use:enhanceForm={{
      result: handleLogout,
    }}
  >
    <button class="underline decoration-primary-400">Logout</button>
  </form>
</PageContainer>

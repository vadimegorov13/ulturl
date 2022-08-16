<script lang="ts">
  import GitHubIcon from '$lib/icons/github.svg';
  import HeartIcon from '$lib/icons/heart.svg';
</script>

<footer class="flex items-center justify-center gap-2 py-2">
  Made with <span>
    <HeartIcon class="absolute w-8 fill-primary-400 hover:animate-ping" />
    <HeartIcon class="w-8 fill-primary-400" />
  </span>
  by
  <a href="https://github.com/vadimegorov13">Vadim Egorov</a>
  <a
    href="https://github.com/vadimegorov13/ulturl"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="checkout the source code at the github repo"
    class="transition-colors hover:text-secondary-400 w-5"
  >
    <GitHubIcon />
  </a>
</footer>

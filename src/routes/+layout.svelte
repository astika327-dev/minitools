<script lang="ts">
  import '../app.css';
  import Button from '$lib/components/ui/button/button.svelte';
  import { isDarkMode } from '$lib/stores/theme';
  import { fade } from 'svelte/transition';

  export let data;

  function toggleDarkMode() {
    isDarkMode.update(n => !n);
  }
</script>

<div class="min-h-screen bg-background text-foreground">
  <header class="p-4 flex justify-between items-center border-b">
    <a href="/" class="text-xl font-bold">Multi Tool</a>
    <Button on:click={toggleDarkMode} variant="outline" size="icon">
      {#if $isDarkMode}
        <span>🌞</span>
      {:else}
        <span>🌜</span>
      {/if}
      <span class="sr-only">Toggle theme</span>
    </Button>
  </header>

  <main class="p-4">
    {#key data.pathname}
      <div in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
        <slot />
      </div>
    {/key}
  </main>
</div>

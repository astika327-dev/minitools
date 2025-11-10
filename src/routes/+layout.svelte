<script lang="ts">
  import '../app.css';
  import { Button } from '$lib/components/ui/button';
  import { isDarkMode } from '$lib/stores/theme';
  import { fade } from 'svelte/transition';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data;

  function toggleDarkMode() {
    isDarkMode.update(n => !n);
  }
</script>

<div class="min-h-screen bg-background text-foreground">
  <header class="p-4 flex justify-between items-center border-b">
    <div class="flex items-center gap-6">
      <a href="/" class="text-xl font-bold">Multi Tool</a>
      <Navbar />
    </div>
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

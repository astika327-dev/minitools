<script lang="ts">
  import '../app.css';
  import { Button } from '$lib/components/ui/button';
  import { isDarkMode } from '$lib/stores/theme';
  import { fade } from 'svelte/transition';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { Sun, Moon } from 'lucide-svelte';
  import { onMount } from 'svelte';

  export let data;

  function toggleDarkMode() {
    isDarkMode.update(n => !n);
  }

  // Sync theme with body class
  $: {
    if (typeof document !== 'undefined') {
      if ($isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
</script>

<div class="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
  <!-- Glassmorphism Header -->
  <header class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center justify-between px-4">
      <div class="flex items-center gap-6">
        <a href="/" class="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
          <span class="bg-gradient-to-br from-primary to-orange-600 bg-clip-text text-transparent">MultiTool</span>
        </a>
        <Navbar />
      </div>

      <Button on:click={toggleDarkMode} variant="ghost" size="icon" class="hover:bg-secondary/80 rounded-full">
        {#if $isDarkMode}
          <Sun class="h-5 w-5 text-orange-400" strokeWidth={1.5} />
        {:else}
          <Moon class="h-5 w-5 text-slate-600" strokeWidth={1.5} />
        {/if}
        <span class="sr-only">Toggle theme</span>
      </Button>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 w-full">
    {#key data.pathname}
      <div in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }} class="w-full h-full">
        <slot />
      </div>
    {/key}
  </main>

  <Footer />
</div>

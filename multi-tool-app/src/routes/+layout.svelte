<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  let isDarkMode = false;

  onMount(() => {
    // Check for saved theme in local storage or user's OS preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      isDarkMode = true;
    } else {
      document.documentElement.classList.remove('dark');
      isDarkMode = false;
    }
  });

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  <header class="p-4 flex justify-between items-center">
    <a href="/" class="text-xl font-bold">Multi Tool</a>
    <button on:click={toggleDarkMode} class="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
      {isDarkMode ? '🌞' : '🌜'}
    </button>
  </header>

  <main>
    <slot />
  </main>
</div>

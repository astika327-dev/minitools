import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create a writable store with a default value of false (light mode)
export const isDarkMode = writable<boolean>(false);

// If in browser, check local storage or OS preference to set the initial value
if (browser) {
  const userPrefersDark = localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  isDarkMode.set(userPrefersDark);

  // Subscribe to changes in the store and update the DOM and local storage
  isDarkMode.subscribe(value => {
    if (value) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  });
}

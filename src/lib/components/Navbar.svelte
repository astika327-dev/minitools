<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Menu, X } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  const categories = [
    { href: "/category/calculations", name: "Calculations" },
    { href: "/category/text-content", name: "Text & Content" },
    { href: "/category/web-security", name: "Web & Security" },
    { href: "/category/financial-health", name: "Financial & Health" },
    { href: "/category/color-design", name: "Color & Design" },
    { href: "/category/image-utilities", name: "Image Utilities" },
    { href: "/category/time-utilities", name: "Time Utilities" },
  ];
</script>

<!-- Desktop Navbar -->
<nav class="hidden md:flex items-center space-x-2">
  {#each categories as category}
    <a href={category.href}>
      <Button variant="ghost">{category.name}</Button>
    </a>
  {/each}
</nav>

<!-- Mobile Navbar (Hamburger) -->
<div class="flex md:hidden">
  <Button on:click={toggleMobileMenu} variant="outline" size="icon">
    {#if isMobileMenuOpen}
      <X class="h-5 w-5" />
    {:else}
      <Menu class="h-5 w-5" />
    {/if}
    <span class="sr-only">Open Menu</span>
  </Button>
</div>

<!-- Mobile Menu Panel -->
{#if isMobileMenuOpen}
  <div
    transition:slide={{ duration: 300, easing: quintOut, axis: 'x' }}
    class="fixed top-0 left-0 h-full w-3/4 max-w-sm bg-background p-6 shadow-lg z-50 border-r"
  >
    <h2 class="text-xl font-bold mb-4">Categories</h2>
    <nav class="flex flex-col space-y-2">
      {#each categories as category}
        <a href={category.href} on:click={toggleMobileMenu} class="block">
          <Button variant="ghost" class="w-full justify-start">{category.name}</Button>
        </a>
      {/each}
    </nav>
  </div>
  <!-- Overlay -->
  <button
    on:click={toggleMobileMenu}
    class="fixed inset-0 bg-black/60 z-40 cursor-default"
    aria-label="Close menu"
  ></button>
{/if}

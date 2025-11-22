<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Menu, X } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { page } from '$app/stores';

  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  const categories = [
    { href: "/category/calculations", name: "Calculations" },
    { href: "/category/text-content", name: "Text" },
    { href: "/category/web-security", name: "Security" },
    { href: "/category/color-design", name: "Design" },
    { href: "/category/image-utilities", name: "Images" },
    { href: "/category/financial-health", name: "Finance" },
    { href: "/category/time-utilities", name: "Time" },
  ];

  // Helper to determine if a link is active
  $: isActive = (href: string) => $page.url.pathname.startsWith(href);
</script>

<!-- Desktop Navbar -->
<nav class="hidden lg:flex items-center gap-1">
  {#each categories as category}
    <a href={category.href}>
      <Button
        variant={isActive(category.href) ? "secondary" : "ghost"}
        class="text-sm font-medium transition-all duration-200 hover:bg-secondary/80"
      >
        {category.name}
      </Button>
    </a>
  {/each}
</nav>

<!-- Mobile Navbar (Hamburger) -->
<div class="flex lg:hidden">
  <Button on:click={toggleMobileMenu} variant="ghost" size="icon" class="hover:bg-secondary/80">
    {#if isMobileMenuOpen}
      <X class="h-5 w-5" strokeWidth={1.5} />
    {:else}
      <Menu class="h-5 w-5" strokeWidth={1.5} />
    {/if}
    <span class="sr-only">Open Menu</span>
  </Button>
</div>

<!-- Mobile Menu Panel -->
{#if isMobileMenuOpen}
  <div
    transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
    class="fixed inset-x-0 top-[3.5rem] bg-background/95 backdrop-blur-md border-b shadow-lg z-50 p-6 lg:hidden"
  >
    <nav class="flex flex-col space-y-2">
      {#each categories as category}
        <a href={category.href} on:click={toggleMobileMenu} class="block">
          <Button
            variant={isActive(category.href) ? "secondary" : "ghost"}
            class="w-full justify-start text-base font-medium"
          >
            {category.name}
          </Button>
        </a>
      {/each}
    </nav>
  </div>

  <!-- Overlay to close when clicking outside (covers the rest of the screen) -->
  <button
    on:click={toggleMobileMenu}
    class="fixed inset-0 top-[3.5rem] bg-black/20 backdrop-blur-sm z-40 cursor-default lg:hidden"
    aria-label="Close menu"
  ></button>
{/if}

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import { Menu } from "lucide-svelte";

  const categories = [
    { href: "/category/calculations", name: "Calculations" },
    { href: "/category/text-content", name: "Text & Content" },
    { href: "/category/web-security", name: "Web & Security" },
    { href: "/category/financial-health", name: "Financial & Health" },
    { href: "/category/color-design", name: "Color & Design" },
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
  <Sheet.Root>
    <Sheet.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline" size="icon">
        <Menu class="h-5 w-5" />
        <span class="sr-only">Open Menu</span>
      </Button>
    </Sheet.Trigger>
    <Sheet.Content side="left">
      <Sheet.Header>
        <Sheet.Title>Categories</Sheet.Title>
      </Sheet.Header>
      <nav class="flex flex-col space-y-2 mt-4">
        {#each categories as category}
          <a href={category.href} class="block">
            <Button variant="ghost" class="w-full justify-start">{category.name}</Button>
          </a>
        {/each}
      </nav>
    </Sheet.Content>
  </Sheet.Root>
</div>

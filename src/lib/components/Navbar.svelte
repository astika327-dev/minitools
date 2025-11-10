<script lang="ts">
  import { Button } from "$lib/components/ui/button";

  const categories = [
    { href: "/category/calculations", name: "Calculations" },
    { href: "/category/text-content", name: "Text & Content" },
    { href: "/category/web-security", name: "Web & Security" },
    { href: "/category/financial-health", name: "Financial & Health" },
  ];
</script>

<nav class="flex items-center space-x-4">
  {#each categories as category}
    <a href={category.href}>
      <Button variant="ghost">{category.name}</Button>
    </a>
  {/each}
</nav>

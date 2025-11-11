<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  export let data;

  const { category } = data;
</script>

<svelte:head>
  <title>{category.title}</title>
  <meta name="description" content={`A collection of ${category.title.toLowerCase()} tools.`} />
</svelte:head>

<div class="container mx-auto p-4">
  <h1 class="text-3xl md:text-4xl font-bold my-8">{category.title}</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each category.tools as tool}
      <a href={tool.href} class="block group">
        <Card.Root class="transition-all duration-200 ease-in-out group-hover:shadow-lg group-hover:border-primary h-full">
          <Card.Header>
            <Card.Title class="flex items-center gap-2">
              <svelte:component this={tool.icon} class="w-5 h-5" />
              <span>{tool.title}</span>
            </Card.Title>
            <Card.Description>{tool.description}</Card.Description>
          </Card.Header>
        </Card.Root>
      </a>
    {/each}
  </div>
</div>

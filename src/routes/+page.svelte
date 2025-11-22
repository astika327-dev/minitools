<script lang="ts">
  import { toolGroups } from "$lib/tools";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
  import { Search, ArrowRight } from "lucide-svelte";
  import { fade, fly } from "svelte/transition";

  let searchQuery = "";

  $: allTools = toolGroups.flatMap(group => group.tools.map(tool => ({ ...tool, category: group.title })));

  $: filteredTools = allTools.filter(tool => {
    const query = searchQuery.toLowerCase();
    return (
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  });
</script>

<svelte:head>
  <title>Multi Tool App - Elegant Online Utilities</title>
  <meta name="description" content="A collection of fast, reliable, and elegant online tools for developers and designers." />
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] pb-20">

  <!-- Hero Section -->
  <section class="w-full py-20 md:py-32 text-center space-y-8 px-4 bg-gradient-to-b from-background to-secondary/30">
    <div class="container mx-auto max-w-4xl space-y-6">
      <h1
        in:fly={{ y: 20, duration: 600, delay: 0 }}
        class="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
      >
        Your Digital Swiss Army Knife.
        <span class="block text-primary mt-2">Refined & Ready.</span>
      </h1>
      <p
        in:fly={{ y: 20, duration: 600, delay: 100 }}
        class="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
      >
        A curated suite of powerful developer utilities and design tools, built with a focus on speed, privacy, and elegance.
      </p>

      <div
        in:fly={{ y: 20, duration: 600, delay: 200 }}
        class="relative max-w-md mx-auto mt-8"
      >
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" strokeWidth={1.5} />
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search for a tool..."
            class="flex h-12 w-full rounded-full border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm transition-all hover:shadow-md"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Tools Grid -->
  <section class="container mx-auto px-4 py-12">
    {#if searchQuery}
      <div class="mb-8">
        <h2 class="text-2xl font-semibold tracking-tight mb-4">Search Results</h2>
        {#if filteredTools.length === 0}
           <p class="text-muted-foreground">No tools found matching "{searchQuery}".</p>
        {/if}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredTools as tool (tool.href)}
          <a
            href={tool.href}
            class="group block h-full"
            in:fade={{ duration: 300 }}
          >
            <div class="h-full rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-muted/60">
              <div class="p-6 flex flex-col h-full">
                <div class="flex items-center justify-between mb-4">
                  <div class="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <svelte:component this={tool.icon} class="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <ArrowRight class="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-colors -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.5} />
                </div>
                <h3 class="text-lg font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">{tool.title}</h3>
                <p class="text-sm text-muted-foreground leading-relaxed flex-1">
                  {tool.description}
                </p>
              </div>
            </div>
          </a>
        {/each}
      </div>

    {:else}
      <!-- Category Based Layout (Default) -->
      <div class="space-y-16">
        {#each toolGroups as group}
          <div class="space-y-6">
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight border-b pb-4 text-foreground/90">{group.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each group.tools as tool (tool.href)}
                <a
                  href={tool.href}
                  class="group block h-full"
                >
                  <div class="h-full rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-muted/60 overflow-hidden">
                     <div class="p-6 flex flex-col h-full">
                      <div class="flex items-center gap-4 mb-4">
                         <div class="p-2.5 rounded-lg bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                            <svelte:component this={tool.icon} class="h-5 w-5" strokeWidth={1.5} />
                         </div>
                         <h3 class="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">{tool.title}</h3>
                      </div>
                      <p class="text-sm text-muted-foreground leading-relaxed flex-1 pl-[3.25rem]">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

</div>

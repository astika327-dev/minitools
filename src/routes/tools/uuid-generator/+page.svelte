<svelte:head>
  <title>UUID Generator</title>
  <meta name="description" content="Generate universally unique identifiers (UUIDs)" />
</svelte:head>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import HowToUse from '$lib/components/HowToUse.svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let uuid = "";

  function generate() {
    if (browser) {
      uuid = crypto.randomUUID();
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(uuid);
  }

  onMount(generate);

  const steps = [
    "A new Version 4 UUID is generated automatically when you load the page.",
    "Click <strong>Generate New UUID</strong> to create a new one.",
    "Click the <strong>Copy</strong> button to copy the UUID to your clipboard."
  ];
</script>

<div class="container mx-auto p-4 max-w-2xl text-center">
  <h1 class="text-3xl font-bold my-6">UUID Generator</h1>

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <input type="text" readonly bind:value={uuid} class="flex-1 p-2 border rounded-md bg-muted font-mono text-center text-lg" />
      <Button on:click={copyToClipboard} variant="outline" size="icon" aria-label="Copy UUID">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
      </Button>
    </div>

    <Button on:click={generate}>Generate New UUID</Button>
  </div>

  <HowToUse {steps} />
</div>

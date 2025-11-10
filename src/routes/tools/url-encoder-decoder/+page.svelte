<svelte:head>
  <title>URL Encoder/Decoder</title>
  <meta name="description" content="Encode or decode URLs and strings" />
</svelte:head>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import HowToUse from '$lib/components/HowToUse.svelte';

  let text = "https://example.com/search?q=hello world!";
  let error = "";

  function encode() {
    error = "";
    text = encodeURIComponent(text);
  }

  function decode() {
    try {
      error = "";
      text = decodeURIComponent(text);
    } catch (e) {
      error = "Invalid URI to decode.";
    }
  }

  const steps = [
    "Paste your URL or string into the text area.",
    "Click <strong>Encode</strong> to convert it into a URL-safe format.",
    "Click <strong>Decode</strong> to convert it back to a human-readable format."
  ];
</script>

<div class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold text-center my-6">URL Encoder/Decoder</h1>

  <div class="space-y-4">
    <textarea
      bind:value={text}
      rows="8"
      class="w-full p-2 border rounded-md bg-background font-mono"
      placeholder="Enter URL or string..."
    ></textarea>

    <div class="flex items-center gap-4">
      <Button on:click={encode}>Encode</Button>
      <Button on:click={decode} variant="secondary">Decode</Button>
      {#if error}
        <p class="text-destructive">{error}</p>
      {/if}
    </div>
  </div>

  <HowToUse {steps} />
</div>

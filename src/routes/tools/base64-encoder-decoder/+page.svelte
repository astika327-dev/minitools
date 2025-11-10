<svelte:head>
  <title>Base64 Encoder/Decoder</title>
  <meta name="description" content="Encode or decode strings to Base64" />
</svelte:head>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import HowToUse from '$lib/components/HowToUse.svelte';
  import { browser } from '$app/environment';

  let text = "Hello, world!";
  let error = "";

  function encode() {
    error = "";
    if (browser) {
      text = btoa(text);
    }
  }

  function decode() {
    error = "";
    if (browser) {
      try {
        text = atob(text);
      } catch (e) {
        error = "Invalid Base64 string to decode.";
      }
    }
  }

  const steps = [
    "Enter any string into the text area.",
    "Click <strong>Encode</strong> to convert it into a Base64 string.",
    "Click <strong>Decode</strong> to convert a Base64 string back to its original format."
  ];
</script>

<div class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold text-center my-6">Base64 Encoder/Decoder</h1>

  <div class="space-y-4">
    <textarea
      bind:value={text}
      rows="8"
      class="w-full p-2 border rounded-md bg-background font-mono"
      placeholder="Enter string or Base64..."
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

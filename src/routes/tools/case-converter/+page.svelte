<svelte:head>
  <title>Case Converter</title>
  <meta name="description" content="Convert text between different letter cases" />
</svelte:head>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";

  let text = "Hello World! This is an example text.";

  function toUpperCase() {
    text = text.toUpperCase();
  }

  function toLowerCase() {
    text = text.toLowerCase();
  }

  function toTitleCase() {
    text = text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function toSentenceCase() {
    text = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
  }
</script>

<div class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold text-center my-6">Case Converter</h1>

  <div class="space-y-4">
    <textarea
      bind:value={text}
      rows="8"
      class="w-full p-2 border rounded-md bg-background"
      placeholder="Enter your text here..."
    ></textarea>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Button on:click={toUpperCase}>Upper Case</Button>
      <Button on:click={toLowerCase}>Lower Case</Button>
      <Button on:click={toTitleCase}>Title Case</Button>
      <Button on:click={toSentenceCase}>Sentence Case</Button>
    </div>
  </div>
</div>

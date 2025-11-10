<svelte:head>
  <title>Lorem Ipsum Generator</title>
  <meta name="description" content="Generate placeholder text for your designs" />
</svelte:head>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";

  const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  let paragraphs = 1;
  let generatedText = LOREM_IPSUM;

  function generate() {
    generatedText = Array(paragraphs).fill(LOREM_IPSUM).join('\\n\\n');
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedText);
  }
</script>

<div class="container mx-auto p-4 max-w-3xl">
  <h1 class="text-3xl font-bold text-center my-6">Lorem Ipsum Generator</h1>

  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <label for="paragraphs" class="font-medium">Number of Paragraphs:</label>
      <input
        type="number"
        id="paragraphs"
        bind:value={paragraphs}
        min="1"
        max="50"
        class="w-24 p-2 border rounded-md bg-background"
      />
      <Button on:click={generate}>Generate</Button>
    </div>

    <Card.Root>
      <Card.Header class="flex flex-row items-center justify-between">
        <Card.Title>Generated Text</Card.Title>
        <Button on:click={copyToClipboard} variant="ghost" size="sm">Copy</Button>
      </Card.Header>
      <Card.Content>
        <textarea
          readonly
          rows="10"
          class="w-full p-2 border rounded-md bg-muted"
          value={generatedText}
        ></textarea>
      </Card.Content>
    </Card.Root>
  </div>
</div>

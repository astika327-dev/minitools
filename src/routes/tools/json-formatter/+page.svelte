<svelte:head>
  <title>JSON Formatter & Validator</title>
  <meta name="description" content="Format and validate JSON data" />
</svelte:head>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import HowToUse from '$lib/components/HowToUse.svelte';

  let jsonText = '{"name":"John Doe","age":30,"isStudent":false,"courses":[{"name":"History","credits":3},{"name":"Math","credits":4}]}';
  let status = "";
  let statusColor = "";

  function format() {
    try {
      const parsed = JSON.parse(jsonText);
      jsonText = JSON.stringify(parsed, null, 2);
      status = "✓ Valid & Formatted";
      statusColor = "text-green-500";
    } catch (e) {
      status = `✗ Invalid JSON: ${e.message}`;
      statusColor = "text-destructive";
    }
  }

  const steps = [
    "Paste your JSON data into the text area.",
    "Click <strong>Format & Validate</strong>.",
    "If the JSON is valid, it will be beautifully formatted (pretty-printed).",
    "If it's invalid, an error message will be displayed below the button."
  ];
</script>

<div class="container mx-auto p-4 max-w-4xl">
  <h1 class="text-3xl font-bold text-center my-6">JSON Formatter & Validator</h1>

  <div class="space-y-4">
    <textarea
      bind:value={jsonText}
      rows="15"
      class="w-full p-2 border rounded-md bg-background font-mono"
      placeholder="Paste your JSON here..."
    ></textarea>

    <div class="flex items-center gap-4">
      <Button on:click={format}>Format & Validate</Button>
      <p class={statusColor}>{status}</p>
    </div>
  </div>

  <HowToUse {steps} />
</div>

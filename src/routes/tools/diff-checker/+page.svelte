<svelte:head>
  <title>Diff Checker</title>
  <meta name="description" content="Compare two texts to find the differences" />
</svelte:head>

<script lang="ts">
  import { diffChars } from 'diff';

  let text1 = "The quick brown fox jumps over the lazy dog.";
  let text2 = "The quick brown cat leaps over the sleepy dog.";

  let differences: ReturnType<typeof diffChars> = [];

  $: differences = diffChars(text1, text2);
</script>

<div class="container mx-auto p-4 max-w-4xl">
  <h1 class="text-3xl font-bold text-center my-6">Diff Checker</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <textarea
      bind:value={text1}
      rows="10"
      class="w-full p-2 border rounded-md bg-background"
      placeholder="Text 1"
    ></textarea>
    <textarea
      bind:value={text2}
      rows="10"
      class="w-full p-2 border rounded-md bg-background"
      placeholder="Text 2"
    ></textarea>
  </div>

  <div class="mt-6">
    <h2 class="text-2xl font-semibold mb-2">Result</h2>
    <div class="p-4 border rounded-md bg-muted whitespace-pre-wrap">
      {#each differences as part}
        <span
          class:text-red-500={part.removed}
          class:bg-red-200={part.removed}
          class:dark:bg-red-900={part.removed}
          class:text-green-500={part.added}
          class:bg-green-200={part.added}
          class:dark:bg-green-900={part.added}
        >
          {part.value}
        </span>
      {/each}
    </div>
  </div>
</div>

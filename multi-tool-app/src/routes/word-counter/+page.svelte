<svelte:head>
  <title>Word Counter</title>
  <meta name="description" content="Count words and characters in your text" />
</svelte:head>

<div class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold text-center my-6">Word Counter</h1>

  <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <textarea
      bind:value={text}
      rows="8"
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
      placeholder="Start typing here..."
    ></textarea>

    <div class="mt-4 flex justify-around text-center">
      <div>
        <p class="text-3xl font-bold">{wordCount}</p>
        <p class="text-gray-600 dark:text-gray-400">Words</p>
      </div>
      <div>
        <p class="text-3xl font-bold">{charCount}</p>
        <p class="text-gray-600 dark:text-gray-400">Characters</p>
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  let text = '';

  $: wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  $: charCount = text.length;
</script>

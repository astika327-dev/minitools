<svelte:head>
  <title>Markdown Editor</title>
  <meta name="description" content="A simple markdown editor with live preview" />
</svelte:head>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold text-center my-6">Markdown Editor</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
    <!-- Markdown Input -->
    <div class="h-full">
      <textarea
        bind:value={markdown}
        class="w-full h-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 resize-none"
        placeholder="## Start typing Markdown..."
      ></textarea>
    </div>

    <!-- HTML Preview -->
    <div class="h-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 overflow-auto prose dark:prose-invert">
      {@html renderedHtml}
    </div>
  </div>
</div>

<script lang="ts">
  import { marked } from 'marked';

  let markdown = `
# Welcome to the Markdown Editor!

## Features
- **Live Preview:** See your rendered HTML as you type.
- **Easy to Use:** Just type Markdown in the left panel.

### Example Code
\`\`\`javascript
console.log("Hello, World!");
\`\`\`
  `;

  let renderedHtml: string;

  $: {
    renderedHtml = marked(markdown) as string;
  }
</script>

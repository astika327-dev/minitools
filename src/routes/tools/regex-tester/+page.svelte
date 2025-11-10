<svelte:head>
  <title>Regex Tester</title>
  <meta name="description" content="Test and validate regular expressions" />
</svelte:head>

<script lang="ts">
  let regexStr = "\\b[A-Z]{2,}\\b";
  let testStr = "This is a TEST sentence with ACRONYMS.";
  let flags = "g";
  let highlightedText = "";

  function testRegex() {
    try {
      const regex = new RegExp(regexStr, flags);
      highlightedText = testStr.replace(regex, (match) => `<mark>${match}</mark>`);
    } catch (e) {
      highlightedText = `<span class="text-red-500">Invalid Regular Expression: ${e.message}</span>`;
    }
  }

  $: {
    testRegex();
  }
</script>

<div class="container mx-auto p-4 max-w-3xl">
  <h1 class="text-3xl font-bold text-center my-6">Regex Tester</h1>

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <span class="text-lg">/</span>
      <input
        type="text"
        bind:value={regexStr}
        class="flex-1 p-2 border rounded-md bg-background font-mono"
        placeholder="Enter your regex..."
      />
      <span class="text-lg">/</span>
      <input
        type="text"
        bind:value={flags}
        class="w-16 p-2 border rounded-md bg-background font-mono"
        placeholder="flags"
      />
    </div>

    <textarea
      bind:value={testStr}
      rows="8"
      class="w-full p-2 border rounded-md bg-background font-mono"
      placeholder="Enter your test string..."
    ></textarea>

    <div>
      <h2 class="text-2xl font-semibold mb-2">Result</h2>
      <div class="p-4 border rounded-md bg-muted whitespace-pre-wrap font-mono">
        {@html highlightedText}
      </div>
    </div>
  </div>
</div>

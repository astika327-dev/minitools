<svelte:head>
  <title>Hash Generator</title>
  <meta name="description" content="Generate hashes (SHA-1, SHA-256, SHA-512)" />
</svelte:head>

<script lang="ts">
  import HowToUse from '$lib/components/HowToUse.svelte';
  import { browser } from '$app/environment';

  let inputText = "hello world";

  let sha1 = "";
  let sha256 = "";
  let sha512 = "";

  async function generateHashes() {
    if (!browser || !inputText) {
      sha1 = sha256 = sha512 = "";
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);

    // SHA-1
    const hashBuffer1 = await crypto.subtle.digest('SHA-1', data);
    const hashArray1 = Array.from(new Uint8Array(hashBuffer1));
    sha1 = hashArray1.map(b => b.toString(16).padStart(2, '0')).join('');

    // SHA-256
    const hashBuffer256 = await crypto.subtle.digest('SHA-256', data);
    const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
    sha256 = hashArray256.map(b => b.toString(16).padStart(2, '0')).join('');

    // SHA-512
    const hashBuffer512 = await crypto.subtle.digest('SHA-512', data);
    const hashArray512 = Array.from(new Uint8Array(hashBuffer512));
    sha512 = hashArray512.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  $: generateHashes();

  const steps = [
    "Enter any text, string, or message into the input area.",
    "The SHA-1, SHA-256, and SHA-512 hashes will be generated automatically as you type."
  ];
</script>

<div class="container mx-auto p-4 max-w-3xl">
  <h1 class="text-3xl font-bold text-center my-6">Hash Generator</h1>

  <div class="space-y-4">
    <textarea
      bind:value={inputText}
      rows="6"
      class="w-full p-2 border rounded-md bg-background font-mono"
      placeholder="Enter text to hash..."
    ></textarea>

    <div class="space-y-3">
      <div>
        <label for="sha1-output" class="font-semibold">SHA-1</label>
        <input id="sha1-output" type="text" readonly value={sha1} class="w-full mt-1 p-2 border rounded-md bg-muted font-mono" />
      </div>
      <div>
        <label for="sha256-output" class="font-semibold">SHA-256</label>
        <input id="sha256-output" type="text" readonly value={sha256} class="w-full mt-1 p-2 border rounded-md bg-muted font-mono" />
      </div>
      <div>
        <label for="sha512-output" class="font-semibold">SHA-512</label>
        <input id="sha512-output" type="text" readonly value={sha512} class="w-full mt-1 p-2 border rounded-md bg-muted font-mono" />
      </div>
    </div>
  </div>

  <HowToUse {steps} />
</div>

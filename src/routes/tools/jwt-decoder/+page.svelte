<svelte:head>
  <title>JWT Decoder</title>
  <meta name="description" content="Decode and inspect JSON Web Tokens (JWTs)" />
</svelte:head>

<script lang="ts">
  import HowToUse from '$lib/components/HowToUse.svelte';

  let jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  let header = "";
  let payload = "";
  let error = "";

  function decodeJwt() {
    try {
      error = "";
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        throw new Error("Invalid JWT structure. It must have 3 parts separated by dots.");
      }
      header = JSON.stringify(JSON.parse(atob(parts[0])), null, 2);
      payload = JSON.stringify(JSON.parse(atob(parts[1])), null, 2);
    } catch (e) {
      error = `Error decoding JWT: ${e.message}`;
      header = "";
      payload = "";
    }
  }

  $: decodeJwt();

  const steps = [
    "Paste your JSON Web Token (JWT) into the main input area.",
    "The header and payload of the token will be automatically decoded and displayed in their respective sections.",
    "This tool only decodes the token; it does <strong>not</strong> verify the signature."
  ];
</script>

<div class="container mx-auto p-4 max-w-4xl">
  <h1 class="text-3xl font-bold text-center my-6">JWT Decoder</h1>

  <div class="space-y-4">
    <textarea
      bind:value={jwt}
      rows="5"
      class="w-full p-2 border rounded-md bg-background font-mono"
      placeholder="Paste your JWT here..."
    ></textarea>
    {#if error}
      <p class="text-destructive">{error}</p>
    {/if}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <div>
      <h2 class="text-2xl font-semibold mb-2">Header</h2>
      <pre class="p-4 border rounded-md bg-muted text-sm whitespace-pre-wrap"><code>{header}</code></pre>
    </div>
    <div>
      <h2 class="text-2xl font-semibold mb-2">Payload</h2>
      <pre class="p-4 border rounded-md bg-muted text-sm whitespace-pre-wrap"><code>{payload}</code></pre>
    </div>
  </div>

  <HowToUse {steps} />
</div>

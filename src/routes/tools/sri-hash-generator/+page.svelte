<script lang="ts">
  import { browser } from "$app/environment";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";

  const title = "SRI Hash Generator";
  const description = "Generate Subresource Integrity hashes for external files.";

  let textContent = "";
  let hashes: { algorithm: string; hash: string }[] = [];
  let isLoading = false;
  let error = "";

  async function generateHashes() {
    if (!browser || !textContent.trim()) return;

    isLoading = true;
    error = "";
    hashes = [];

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(textContent);

      const algorithms = ["SHA-256", "SHA-384", "SHA-512"];
      const generatedHashes = [];

      for (const alg of algorithms) {
        const hashBuffer = await crypto.subtle.digest(alg, data);
        const hashBase64 = bufferToBase64(hashBuffer);
        generatedHashes.push({
          algorithm: alg.toLowerCase().replace('-', ''),
          hash: `${alg.toLowerCase()}-${hashBase64}`,
        });
      }
      hashes = generatedHashes;
    } catch (e) {
      error = "Gagal menghasilkan hash. Silakan coba lagi.";
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  function bufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
</script>

<svelte:head>
  <title>{title} - MiniTools</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">{title}</h1>
    <p class="text-muted-foreground">{description}</p>
  </div>

  <hr class="border-border" />

  <Card>
    <CardHeader>
        <CardTitle>Konten File</CardTitle>
        <CardDescription>Tempelkan seluruh konten file (misalnya, JavaScript atau CSS) di bawah ini untuk menghasilkan hash integritasnya.</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
        <textarea
            bind:value={textContent}
            rows={10}
            placeholder="/* Tempelkan konten file di sini... */"
            class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
        ></textarea>
        <Button on:click={generateHashes} disabled={isLoading || !textContent.trim()} class="w-full">
            {#if isLoading}
                Menghasilkan...
            {:else}
                Hasilkan Hash SRI
            {/if}
        </Button>
    </CardContent>
  </Card>

  {#if error}
    <p class="text-destructive text-center">{error}</p>
  {/if}

  {#if hashes.length > 0}
    <Card>
        <CardHeader>
            <CardTitle>Hash yang Dihasilkan</CardTitle>
            <CardDescription>Gunakan salah satu dari hash ini di atribut `integrity` pada tag &lt;script&gt; atau &lt;link&gt; Anda.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
            {#each hashes as item}
                <div class="space-y-1">
                    <label for={item.algorithm} class="text-sm font-medium">{item.algorithm.toUpperCase()}</label>
                    <input id={item.algorithm} type="text" readonly value={item.hash} class="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm cursor-copy" on:focus={(e) => e.currentTarget.select()} />
                </div>
            {/each}
            <div class="pt-4">
                <h4 class="font-semibold">Contoh Penggunaan:</h4>
                <pre class="mt-2 p-3 bg-muted rounded-md text-sm overflow-x-auto"><code>&lt;script src=".../file.js"
  integrity="{hashes[1].hash}"
  crossorigin="anonymous"&gt;&lt;/script&gt;</code></pre>
            </div>
        </CardContent>
    </Card>
  {/if}

</div>

<script lang="ts">
  import { browser } from "$app/environment";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";
  import { CheckCircle2, XCircle, AlertTriangle } from "lucide-svelte";

  const title = "Advanced JWT Debugger";
  const description = "Verify signatures and analyze JWT vulnerabilities.";

  let jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  let secretOrKey = "your-256-bit-secret";
  let decodedHeader: object | null = null;
  let decodedPayload: object | null = null;
  let signatureStatus: 'unverified' | 'valid' | 'invalid' = 'unverified';
  let error = "";

  function decodeAndVerify() {
    if (!browser || !jwtToken) return;

    error = "";
    signatureStatus = 'unverified';

    try {
      const parts = jwtToken.split('.');
      if (parts.length !== 3) {
        throw new Error("Token JWT tidak valid.");
      }

      decodedHeader = JSON.parse(atobUrl(parts[0]));
      decodedPayload = JSON.parse(atobUrl(parts[1]));

      verifySignature(parts);

    } catch (e) {
      error = `Gagal mendekode token: ${e.message}`;
      decodedHeader = null;
      decodedPayload = null;
    }
  }

  async function verifySignature(parts: string[]) {
    try {
        const [headerB64, payloadB64, signatureB64] = parts;
        const header = decodedHeader as any;

        if (!header || !header.alg || header.alg.toLowerCase() === 'none') {
            signatureStatus = 'invalid';
            error = "Peringatan: Token tidak aman, menggunakan algoritma 'none'.";
            return;
        }

        const data = `${headerB64}.${payloadB64}`;
        const signature = urlB64ToUint8Array(signatureB64);

        if (header.alg.toLowerCase().startsWith('hs')) { // HMAC
            const key = await crypto.subtle.importKey(
                'raw',
                new TextEncoder().encode(secretOrKey),
                { name: 'HMAC', hash: `SHA-${header.alg.slice(2)}` },
                false,
                ['verify']
            );
            const isValid = await crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(data));
            signatureStatus = isValid ? 'valid' : 'invalid';
        } else {
             signatureStatus = 'unverified';
             error = "Verifikasi untuk algoritma selain HMAC saat ini tidak didukung di simulator ini.";
        }
    } catch (e) {
        signatureStatus = 'invalid';
        error = `Kesalahan verifikasi tanda tangan: ${e.message}`;
    }
  }

  function atobUrl(b64: string): string {
    return atob(b64.replace(/-/g, '+').replace(/_/g, '/'));
  }

  function urlB64ToUint8Array(b64Url: string) {
    const b64 = b64Url.replace(/-/g, '+').replace(/_/g, '/');
    const binaryString = atob(b64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
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

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div class="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Token JWT</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea bind:value={jwtToken} rows={5} class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Tempel token JWT Anda di sini..."></textarea>
        </CardContent>
      </Card>
      <Card>
          <CardHeader>
              <CardTitle>Secret (untuk HS256) atau Kunci Publik (untuk RS256)</CardTitle>
          </CardHeader>
          <CardContent>
              <textarea bind:value={secretOrKey} rows={5} class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Tempel secret atau kunci publik Anda..."></textarea>
          </CardContent>
      </Card>
      <Button on:click={decodeAndVerify} class="w-full">Decode & Verifikasi</Button>
    </div>

    <div class="space-y-4">
      <Card>
          <CardHeader>
              <CardTitle class="flex items-center justify-between">
                Verifikasi Tanda Tangan
                {#if signatureStatus === 'valid'}
                  <span class="flex items-center gap-2 text-sm text-green-500"><CheckCircle2 class="w-4 h-4" />Valid</span>
                {:else if signatureStatus === 'invalid'}
                   <span class="flex items-center gap-2 text-sm text-destructive"><XCircle class="w-4 h-4" />Invalid</span>
                {:else}
                   <span class="flex items-center gap-2 text-sm text-muted-foreground"><AlertTriangle class="w-4 h-4" />Unverified</span>
                {/if}
              </CardTitle>
          </CardHeader>
      </Card>
      {#if decodedHeader}
      <Card>
        <CardHeader><CardTitle>Header</CardTitle></CardHeader>
        <CardContent><pre class="bg-muted p-4 rounded-md text-sm overflow-x-auto"><code>{JSON.stringify(decodedHeader, null, 2)}</code></pre></CardContent>
      </Card>
      {/if}
       {#if decodedPayload}
      <Card>
        <CardHeader><CardTitle>Payload</CardTitle></CardHeader>
        <CardContent><pre class="bg-muted p-4 rounded-md text-sm overflow-x-auto"><code>{JSON.stringify(decodedPayload, null, 2)}</code></pre></CardContent>
      </Card>
      {/if}
      {#if error}
        <p class="text-sm text-destructive text-center p-2 bg-destructive/10 rounded-md">{error}</p>
      {/if}
    </div>
  </div>
</div>

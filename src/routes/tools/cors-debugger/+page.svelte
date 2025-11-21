<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";
  import { CheckCircle2, XCircle, HelpCircle } from "lucide-svelte";

  const title = "CORS Simulator & Debugger";
  const description = "Simulate and debug complex Cross-Origin requests.";

  // Request Details
  let requestOrigin = "https://example.com";
  let requestMethod = "GET";
  let requestHeaders = "Content-Type, X-Custom-Header";

  // Server Response Headers
  let allowOrigin = "*";
  let allowMethods = "GET, POST, OPTIONS";
  let allowHeaders = "Content-Type, Authorization";
  let allowCredentials = false;

  // Simulation Results
  let logs: { type: 'info' | 'success' | 'error'; message: string }[] = [];
  let finalResult: 'success' | 'failure' | null = null;

  function simulateCorsRequest() {
    logs = [];
    finalResult = null;

    logs.push({ type: 'info', message: `Mulai simulasi: Permintaan dari ${requestOrigin} ke sumber daya lain.` });

    const isSimpleRequest = checkSimpleRequest();

    if (isSimpleRequest) {
      logs.push({ type: 'info', message: "Permintaan ini diklasifikasikan sebagai 'permintaan sederhana'. Tidak ada preflight yang diperlukan." });
      runActualRequestCheck();
    } else {
      logs.push({ type: 'info', message: "Permintaan ini memerlukan preflight (OPTIONS request)." });
      runPreflightCheck();
    }
  }

  function checkSimpleRequest(): boolean {
      const simpleMethods = ['GET', 'HEAD', 'POST'];
      if (!simpleMethods.includes(requestMethod.toUpperCase())) {
          return false;
      }

      const simpleHeaders = ['content-type', 'accept', 'accept-language', 'content-language'];
      const reqHeaders = requestHeaders.toLowerCase().split(',').map(h => h.trim()).filter(Boolean);
      for(const header of reqHeaders) {
          if(!simpleHeaders.includes(header)) {
              return false;
          }
      }
      // Note: This is a simplified check. 'Content-Type' for POST must also be simple.
      return true;
  }

  function runPreflightCheck() {
      logs.push({ type: 'info', message: "1. Browser mengirim permintaan preflight OPTIONS." });

      // Check Origin
      if (allowOrigin === '*' || allowOrigin === requestOrigin) {
          logs.push({ type: 'success', message: `2. Preflight Origin Check: Lolos. Server mengizinkan ${allowOrigin}.` });
      } else {
          logs.push({ type: 'error', message: `2. Preflight Origin Check: Gagal. Server mengizinkan '${allowOrigin}', tetapi permintaan berasal dari '${requestOrigin}'.` });
          finalResult = 'failure';
          return;
      }

      // Check Method
      const allowedMethods = allowMethods.toUpperCase().split(',').map(m => m.trim());
      if (allowedMethods.includes(requestMethod.toUpperCase())) {
          logs.push({ type: 'success', message: `3. Preflight Method Check: Lolos. Server mengizinkan metode ${requestMethod.toUpperCase()}.` });
      } else {
          logs.push({ type: 'error', message: `3. Preflight Method Check: Gagal. Server tidak mengizinkan metode '${requestMethod.toUpperCase()}'.` });
          finalResult = 'failure';
          return;
      }

      // Check Headers
      const allowedHeaders = allowHeaders.toLowerCase().split(',').map(h => h.trim());
      const requestedHeaders = requestHeaders.toLowerCase().split(',').map(h => h.trim()).filter(Boolean);
      let headersOk = true;
      for (const header of requestedHeaders) {
          if (!allowedHeaders.includes(header)) {
              logs.push({ type: 'error', message: `4. Preflight Headers Check: Gagal. Header '${header}' tidak diizinkan oleh server.` });
              headersOk = false;
          }
      }

      if (headersOk) {
          logs.push({ type: 'success', message: "4. Preflight Headers Check: Lolos. Semua header permintaan diizinkan." });
          logs.push({ type: 'success', message: "Preflight berhasil! Browser sekarang akan membuat permintaan yang sebenarnya." });
          runActualRequestCheck();
      } else {
          finalResult = 'failure';
      }
  }

  function runActualRequestCheck() {
      logs.push({ type: 'info', message: `5. Browser mengirim permintaan ${requestMethod} yang sebenarnya.` });

      if (allowOrigin === '*' && allowCredentials) {
           logs.push({ type: 'error', message: `6. Actual Request Check: Gagal. Server tidak dapat merespons dengan '*' untuk origin ketika kredensial diizinkan.` });
           finalResult = 'failure';
           return;
      }

      if (allowOrigin === '*' || allowOrigin === requestOrigin) {
          logs.push({ type: 'success', message: `6. Actual Request Check: Lolos. Server mengizinkan origin ${requestOrigin}.` });
          finalResult = 'success';
      } else {
          logs.push({ type: 'error', message: `6. Actual Request Check: Gagal. Server mengizinkan '${allowOrigin}', tetapi permintaan berasal dari '${requestOrigin}'.` });
          finalResult = 'failure';
      }
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
                <CardTitle>Detail Permintaan Browser</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
                <div>
                    <label for="req-origin" class="text-sm font-medium">Origin Permintaan</label>
                    <input id="req-origin" type="text" bind:value={requestOrigin} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                 <div>
                    <label for="req-method" class="text-sm font-medium">Metode Permintaan</label>
                    <select id="req-method" bind:value={requestMethod} class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>GET</option>
                        <option>POST</option>
                        <option>PUT</option>
                        <option>DELETE</option>
                        <option>PATCH</option>
                        <option>OPTIONS</option>
                    </select>
                </div>
                 <div>
                    <label for="req-headers" class="text-sm font-medium">Header Permintaan (dipisahkan koma)</label>
                    <input id="req-headers" type="text" bind:value={requestHeaders} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Header Respons Server</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
                <div>
                    <label for="res-origin" class="text-sm font-medium">Access-Control-Allow-Origin</label>
                    <input id="res-origin" type="text" bind:value={allowOrigin} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                 <div>
                    <label for="res-methods" class="text-sm font-medium">Access-Control-Allow-Methods</label>
                    <input id="res-methods" type="text" bind:value={allowMethods} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                 <div>
                    <label for="res-headers" class="text-sm font-medium">Access-Control-Allow-Headers</label>
                    <input id="res-headers" type="text" bind:value={allowHeaders} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                 <div class="flex items-center gap-2">
                    <input id="res-creds" type="checkbox" bind:checked={allowCredentials} class="h-4 w-4 shrink-0 rounded-sm border border-primary" />
                    <label for="res-creds" class="text-sm font-medium">Access-Control-Allow-Credentials</label>
                </div>
            </CardContent>
        </Card>
    </div>
    <div class="space-y-4">
        <Button on:click={simulateCorsRequest} class="w-full">Jalankan Simulasi</Button>
        <Card>
             <CardHeader>
                <CardTitle>Log Simulasi Browser</CardTitle>
            </CardHeader>
            <CardContent>
                {#if logs.length === 0}
                    <p class="text-sm text-center text-muted-foreground py-4">Klik 'Jalankan Simulasi' untuk memulai.</p>
                {:else}
                    <ul class="space-y-3">
                        {#each logs as log}
                            <li class="flex items-start gap-3">
                                <div class="mt-1">
                                    {#if log.type === 'success'}
                                        <CheckCircle2 class="w-4 h-4 text-green-500" />
                                    {:else if log.type === 'error'}
                                        <XCircle class="w-4 h-4 text-destructive" />
                                    {:else}
                                        <HelpCircle class="w-4 h-4 text-muted-foreground" />
                                    {/if}
                                </div>
                                <p class="text-sm flex-1 {log.type === 'error' ? 'text-destructive' : ''}">{log.message}</p>
                            </li>
                        {/each}
                    </ul>
                    <hr class="my-4" />
                    <div class="text-center">
                        {#if finalResult === 'success'}
                            <p class="font-bold text-green-500">Hasil Akhir: Permintaan CORS akan BERHASIL.</p>
                        {:else if finalResult === 'failure'}
                             <p class="font-bold text-destructive">Hasil Akhir: Permintaan CORS akan GAGAL.</p>
                        {/if}
                    </div>
                {/if}
            </CardContent>
        </Card>
    </div>
  </div>
</div>

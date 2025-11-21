<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";
  import { Wifi, WifiOff } from "lucide-svelte";

  const title = "WebRTC Leak Tester";
  const description = "Check for IP leaks via WebRTC connections.";

  let isLoading = false;
  let ipAddresses = new Set<string>();
  let error = "";
  let isTestRun = false;

  async function startTest() {
    if (!browser) return;

    isLoading = true;
    isTestRun = true;
    ipAddresses.clear();
    error = "";

    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      });

      pc.onicecandidate = (event) => {
        if (event.candidate && event.candidate.candidate) {
          const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
          const foundIps = event.candidate.candidate.match(ipRegex);
          if (foundIps) {
            foundIps.forEach(ip => ipAddresses.add(ip));
            ipAddresses = ipAddresses; // Trigger reactivity
          }
        }
      };

      pc.createDataChannel("");
      await pc.createOffer().then(offer => pc.setLocalDescription(offer));

      setTimeout(() => {
        isLoading = false;
        if (ipAddresses.size === 0) {
          error = "Tidak ada alamat IP yang ditemukan. WebRTC mungkin dinonaktifkan atau diblokir.";
        }
        pc.close();
      }, 2000);

    } catch (e) {
      console.error(e);
      error = "Gagal memulai tes WebRTC. Browser Anda mungkin tidak mendukungnya.";
      isLoading = false;
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

  <Card>
    <CardHeader>
        <CardTitle>Tes Kebocoran Alamat IP</CardTitle>
        <CardDescription>Klik tombol di bawah untuk memulai tes. Tool ini akan mencoba membuat koneksi WebRTC untuk menemukan alamat IP lokal dan publik yang diekspos oleh browser Anda. Ini dapat mengungkapkan IP asli Anda bahkan saat menggunakan VPN.</CardDescription>
    </CardHeader>
    <CardContent>
        <Button on:click={startTest} disabled={isLoading} class="w-full">
            {#if isLoading}
                Menjalankan Tes...
            {:else}
                Mulai Tes
            {/if}
        </Button>
    </CardContent>
  </Card>

  {#if isTestRun && !isLoading}
    <Card>
        <CardHeader>
            <CardTitle>Hasil Tes</CardTitle>
        </CardHeader>
        <CardContent>
            {#if ipAddresses.size > 0}
                <p class="text-sm mb-4">Alamat IP berikut terdeteksi. Jika Anda menggunakan VPN, periksa apakah alamat IP publik Anda yang sebenarnya ada dalam daftar ini.</p>
                <ul class="space-y-2">
                    {#each Array.from(ipAddresses) as ip}
                        <li class="flex items-center gap-3 p-2 bg-muted rounded-md">
                            <Wifi class="w-5 h-5 text-primary" />
                            <span class="font-mono text-sm">{ip}</span>
                        </li>
                    {/each}
                </ul>
            {:else if error}
                <div class="flex flex-col items-center justify-center text-center p-4">
                    <WifiOff class="w-10 h-10 mb-3 text-destructive" />
                    <p class="font-semibold">{error}</p>
                </div>
            {:else}
                 <div class="flex flex-col items-center justify-center text-center p-4">
                    <WifiOff class="w-10 h-10 mb-3 text-muted-foreground" />
                    <p class="font-semibold">Tidak ada alamat IP yang ditemukan.</p>
                </div>
            {/if}
        </CardContent>
    </Card>
  {/if}

</div>

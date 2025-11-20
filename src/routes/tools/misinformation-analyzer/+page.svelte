<script lang="ts">
  import HowToUse from "$lib/components/HowToUse.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";
  import { Lightbulb, Newspaper, Scale } from "lucide-svelte";

  const title = "Penganalisis Berita & Misinformasi";
  const description = "Analisis URL berita untuk mendeteksi bias dan misinformasi.";

  const steps = [
    {
        title: "Masukkan URL",
        description: "Salin dan tempel URL lengkap dari artikel berita yang ingin Anda analisis ke dalam kolom input yang tersedia."
    },
    {
        title: "Mulai Analisis",
        description: "Klik tombol 'Analisis' untuk memulai proses. Tool ini (saat ini disimulasikan) akan memeriksa sumber, mendeteksi bias bahasa, dan membandingkannya dengan database misinformasi."
    },
    {
        title: "Tinjau Hasil",
        description: "Hasilnya akan ditampilkan, memberikan Anda gambaran tentang keandalan sumber, potensi bias politik, dan klaim yang perlu diverifikasi lebih lanjut."
    }
  ];

  let url = "";
  let analysisResult: {
    sourceReliability: 'Tinggi' | 'Sedang' | 'Rendah' | 'Tidak Diketahui';
    bias: 'Kiri' | 'Kanan' | 'Tengah' | 'Tidak Terdeteksi';
    claims: string[];
  } | null = null;
  let isLoading = false;

  function analyzeUrl() {
    if (!url.trim()) return;

    isLoading = true;
    analysisResult = null;

    // Simulasi pemanggilan API
    setTimeout(() => {
      analysisResult = {
        sourceReliability: 'Sedang',
        bias: 'Kanan',
        claims: [
          "Klaim tentang 'peningkatan dramatis' tidak didukung oleh data spesifik dalam artikel.",
          "Artikel ini mengutip seorang ahli yang memiliki hubungan finansial dengan industri terkait.",
          "Bahasa yang digunakan, seperti 'serangan tak henti-hentinya', bersifat emotif dan menunjukkan bias."
        ]
      };
      isLoading = false;
    }, 1500);
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
        <CardTitle>Analisis Artikel</CardTitle>
        <CardDescription>Masukkan URL artikel berita untuk memulai. Layanan ini masih dalam tahap beta dan hasil bersifat simulasi.</CardDescription>
    </CardHeader>
    <CardContent>
        <form on:submit|preventDefault={analyzeUrl} class="flex gap-2">
            <input bind:value={url} type="url" placeholder="https://contoh-berita.com/artikel..." disabled={isLoading} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
            <Button type="submit" disabled={isLoading}>
              {#if isLoading}
                Menganalisis...
              {:else}
                Analisis
              {/if}
            </Button>
        </form>
    </CardContent>
  </Card>

  {#if analysisResult}
    <div class="space-y-4">
        <h2 class="text-xl font-semibold">Hasil Analisis</h2>
        <div class="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium">Keandalan Sumber</CardTitle>
                    <Newspaper class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{analysisResult.sourceReliability}</div>
                    <p class="text-xs text-muted-foreground">Berdasarkan reputasi domain dan sejarah</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium">Deteksi Bias Politik</CardTitle>
                    <Scale class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{analysisResult.bias}</div>
                    <p class="text-xs text-muted-foreground">Berdasarkan analisis bahasa dan framing</p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle class="flex items-center gap-2">
                    <Lightbulb class="h-5 w-5" />
                    Poin Penting untuk Diperhatikan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul class="space-y-2 list-disc pl-5">
                    {#each analysisResult.claims as claim}
                        <li class="text-sm">{claim}</li>
                    {/each}
                </ul>
            </CardContent>
        </Card>
    </div>
  {/if}

  <HowToUse {steps} />
</div>

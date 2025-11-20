<script lang="ts">
  import HowToUse from "$lib/components/HowToUse.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card";
  import { UploadCloud, CheckCircle2, XCircle } from "lucide-svelte";

  const title = "Pemeriksa Tanda Air Konten AI";
  const description = "Deteksi tanda air atau pola konten buatan AI.";

  const steps = [
    {
      title: "Unggah Konten Anda",
      description:
        "Klik pada area unggah untuk memilih file gambar atau teks yang ingin Anda periksa. Fungsionalitas unggah saat ini disimulasikan.",
    },
    {
      title: "Mulai Pemeriksaan",
      description:
        "Setelah memilih file, klik tombol 'Periksa Konten'. Sistem akan menganalisis file untuk mencari pola atau tanda air tersembunyi yang mengindikasikan pembuatan oleh AI.",
    },
    {
      title: "Lihat Hasilnya",
      description:
        "Hasil analisis akan menunjukkan apakah tanda air terdeteksi, beserta skor keyakinan dari model AI kami.",
    },
  ];

  let fileName: string | null = null;
  let analysisResult: {
    detected: boolean;
    confidence: number;
    model?: string;
  } | null = null;
  let isLoading = false;

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      fileName = input.files[0].name;
      analysisResult = null;
    }
  }

  function checkContent() {
    if (!fileName) return;

    isLoading = true;
    analysisResult = null;

    // Simulasi pemanggilan API
    setTimeout(() => {
        const detected = Math.random() > 0.5;
        analysisResult = {
            detected,
            confidence: Math.round(Math.random() * (99 - 75) + 75),
            model: detected ? "Model Gen-4B" : undefined
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
        <CardTitle>Periksa Konten</CardTitle>
        <CardDescription>Unggah file gambar atau teks untuk memulai. Layanan ini masih dalam tahap beta dan hasil bersifat simulasi.</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
        <label
            for="file-upload"
            class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80"
        >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud class="w-10 h-10 mb-3 text-muted-foreground" />
                <p class="mb-2 text-sm text-muted-foreground">
                    <span class="font-semibold">Klik untuk mengunggah</span> atau seret dan lepas
                </p>
                {#if fileName}
                    <p class="text-xs text-primary">{fileName}</p>
                {:else}
                    <p class="text-xs text-muted-foreground">PNG, JPG, atau TXT (maks. 5MB)</p>
                {/if}
            </div>
            <input id="file-upload" type="file" class="hidden" on:change={handleFileSelect} disabled={isLoading} />
        </label>
        <Button on:click={checkContent} disabled={isLoading || !fileName} class="w-full">
          {#if isLoading}
            Menganalisis...
          {:else}
            Periksa Konten
          {/if}
        </Button>
    </CardContent>
  </Card>

  {#if analysisResult}
    <Card>
        <CardHeader>
            <CardTitle>Hasil Pemeriksaan</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col items-center justify-center text-center space-y-3">
            {#if analysisResult.detected}
                <CheckCircle2 class="w-16 h-16 text-green-500" />
                <h3 class="text-2xl font-bold">Tanda Air Terdeteksi</h3>
                <p class="text-muted-foreground">
                    Kami {analysisResult.confidence}% yakin bahwa konten ini dibuat oleh AI, kemungkinan oleh
                    <strong>{analysisResult.model}</strong>.
                </p>
            {:else}
                <XCircle class="w-16 h-16 text-destructive" />
                <h3 class="text-2xl font-bold">Tidak Ada Tanda Air yang Terdeteksi</h3>
                <p class="text-muted-foreground">
                    Meskipun kami {analysisResult.confidence}% yakin, ini tidak menjamin bahwa konten tersebut
                    dibuat oleh manusia.
                </p>
            {/if}
        </CardContent>
    </Card>
  {/if}


  <HowToUse {steps} />
</div>

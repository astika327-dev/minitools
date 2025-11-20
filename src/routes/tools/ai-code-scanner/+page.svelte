<script lang="ts">
  import HowToUse from "$lib/components/HowToUse.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";
  import { ShieldAlert } from "lucide-svelte";

  const title = "Pemindai Kerentanan Kode AI";
  const description = "Pindai kode untuk kerentanan keamanan menggunakan AI.";

  const steps = [
    {
      title: "Pilih Bahasa",
      description:
        "Pilih bahasa pemrograman dari kode yang akan Anda pindai untuk akurasi deteksi yang lebih baik.",
    },
    {
      title: "Tempel Kode Anda",
      description:
        "Tempelkan potongan kode yang ingin Anda periksa ke dalam area teks yang disediakan.",
    },
    {
      title: "Dapatkan Hasil Simulasi",
      description:
        "Klik 'Pindai Kode'. Sistem (saat ini disimulasikan) akan menganalisis kode Anda dan menampilkan daftar potensi kerentanan keamanan beserta tingkat keparahannya.",
    },
  ];

  let code = "";
  let language = "javascript";
  let analysisResult: {
    vulnerability: string;
    severity: 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
    description: string;
  }[] | null = null;
  let isLoading = false;

  function analyzeCode() {
    if (!code.trim()) return;

    isLoading = true;
    analysisResult = null;

    // Simulasi pemanggilan API analisis kode
    setTimeout(() => {
      analysisResult = [
        {
          vulnerability: "SQL Injection",
          severity: 'Kritis',
          description: "Input pengguna tampaknya langsung dimasukkan ke dalam query database pada baris 12. Gunakan parameterized queries untuk mencegah ini."
        },
        {
          vulnerability: "Cross-Site Scripting (XSS)",
          severity: 'Tinggi',
          description: "Data dari `userInput` dirender langsung ke DOM tanpa sanitasi yang memadai pada baris 25, memungkinkan potensi serangan XSS."
        },
        {
          vulnerability: "Hardcoded Secret",
          severity: 'Sedang',
          description: "Sebuah kunci API tampaknya di-hardcode di dalam kode pada baris 5. Sebaiknya gunakan environment variables untuk menyimpan informasi sensitif."
        }
      ];
      isLoading = false;
    }, 2000);
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
        <CardTitle>Pindai Kode Anda</CardTitle>
        <CardDescription>Tempel kode di bawah ini. Layanan ini masih dalam tahap beta dan hasil bersifat simulasi.</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
        <select bind:value={language} class="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="php">PHP</option>
            <option value="other">Lainnya</option>
        </select>
        <textarea bind:value={code} rows={12} placeholder="// Tempel kode Anda di sini..." disabled={isLoading} class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></textarea>
        <Button on:click={analyzeCode} disabled={isLoading} class="w-full">
          {#if isLoading}
            Menganalisis Kode...
          {:else}
            Pindai Kode
          {/if}
        </Button>
    </CardContent>
  </Card>

  {#if analysisResult}
    <div class="space-y-4">
        <h2 class="text-xl font-semibold">Hasil Analisis</h2>
        {#each analysisResult as item}
            <Card class="border-l-4 {item.severity === 'Kritis' ? 'border-destructive' : item.severity === 'Tinggi' ? 'border-orange-500' : 'border-yellow-500'}">
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <ShieldAlert class="{item.severity === 'Kritis' ? 'text-destructive' : item.severity === 'Tinggi' ? 'text-orange-500' : 'text-yellow-500'} h-5 w-5" />
                        {item.vulnerability}
                        <span class="text-sm font-medium text-muted-foreground">({item.severity})</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-sm">{item.description}</p>
                </CardContent>
            </Card>
        {/each}
    </div>
  {/if}

  <HowToUse {steps} />
</div>

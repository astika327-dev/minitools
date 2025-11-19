<script lang="ts">
  import { Separator } from "$lib/components/ui/separator/index.ts";
  import HowToUse from "$lib/components/HowToUse.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-svelte";

  const title = "Kerangka Keputusan Etis";
  const description = "Panduan interaktif untuk mengevaluasi dampak etis produk.";

  const steps = [
    {
      title: "Jawab Pertanyaan",
      description:
        "Luangkan waktu untuk menjawab setiap pertanyaan secara mendalam. Jawaban Anda akan membantu Anda merefleksikan berbagai aspek etis dari proyek atau keputusan Anda.",
    },
    {
      title: "Navigasi",
      description:
        "Gunakan tombol 'Berikutnya' dan 'Sebelumnya' untuk bergerak di antara pertanyaan. Anda dapat kembali dan mengubah jawaban Anda kapan saja.",
    },
    {
      title: "Tinjau Ringkasan",
      description:
        "Setelah menyelesaikan semua pertanyaan, Anda akan melihat ringkasan dari semua jawaban Anda. Gunakan ini sebagai dokumen refleksi untuk memandu langkah Anda selanjutnya.",
    },
  ];

  const questions = [
    {
      id: 1,
      title: "Transparansi",
      question:
        "Bagaimana pengguna akan memahami cara kerja produk/keputusan ini dan bagaimana data mereka digunakan? Informasi apa yang akan disediakan untuk mereka?",
    },
    {
      id: 2,
      title: "Keadilan & Bias",
      question:
        "Dapatkah produk/keputusan ini menciptakan atau memperkuat bias yang tidak adil terhadap kelompok atau individu tertentu? Bagaimana Anda akan menguji dan mengurangi hal ini?",
    },
    {
      id: 3,
      title: "Akuntabilitas",
      question:
        "Jika terjadi kesalahan, siapa yang bertanggung jawab? Mekanisme apa yang tersedia bagi pengguna untuk mencari ganti rugi atau mengajukan banding atas keputusan?",
    },
    {
      id: 4,
      title: "Potensi Bahaya",
      question:
        "Apa potensi konsekuensi negatif atau skenario penyalahgunaan produk ini? Bagaimana bahaya ini dapat diminimalkan?",
    },
    {
      id: 5,
      title: "Kesejahteraan Pengguna",
      question:
        "Apakah produk ini mempromosikan kesejahteraan pengguna, atau dapatkah menyebabkan hasil negatif seperti kecanduan, kecemasan, atau tekanan sosial? Pilihan desain apa yang mendukung pengalaman pengguna yang positif?",
    },
  ];

  let currentQuestionIndex = 0;
  let answers = Array(questions.length).fill("");
  let isFinished = false;

  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
    }
  }

  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
    }
  }

  function finishFramework() {
    isFinished = true;
  }

  function resetFramework() {
    currentQuestionIndex = 0;
    answers = Array(questions.length).fill("");
    isFinished = false;
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

  <Separator />

  {#if isFinished}
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
            <CardTitle>Ringkasan Refleksi Anda</CardTitle>
            <Button variant="ghost" size="icon" on:click={resetFramework}>
                <RefreshCw class="h-4 w-4" />
                <span class="sr-only">Mulai Lagi</span>
            </Button>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        {#each questions as question, i}
          <div>
            <h3 class="font-semibold">{i + 1}. {question.title}</h3>
            <p class="text-sm text-muted-foreground mb-2">{question.question}</p>
            <div class="p-3 bg-muted rounded-md text-sm">
              {@html answers[i] ? answers[i].replace(/\n/g, '<br>') : '<em>Tidak ada jawaban.</em>'}
            </div>
          </div>
        {/each}
      </CardContent>
    </Card>
  {:else}
    <Card>
      <CardHeader>
        <CardTitle>{questions[currentQuestionIndex].title}</CardTitle>
        <p class="text-sm text-muted-foreground">
          Langkah {currentQuestionIndex + 1} dari {questions.length}
        </p>
      </CardHeader>
      <CardContent class="space-y-4">
        <p>{questions[currentQuestionIndex].question}</p>
        <Textarea
          bind:value={answers[currentQuestionIndex]}
          rows={8}
          placeholder="Tuliskan pemikiran Anda di sini..."
        />
        <div class="flex justify-between">
          <Button variant="outline" on:click={prevQuestion} disabled={currentQuestionIndex === 0}>
            <ArrowLeft class="mr-2 h-4 w-4" />
            Sebelumnya
          </Button>
          {#if currentQuestionIndex === questions.length - 1}
            <Button on:click={finishFramework}>Selesai</Button>
          {:else}
            <Button on:click={nextQuestion}>
              Berikutnya
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          {/if}
        </div>
      </CardContent>
    </Card>
  {/if}


  <HowToUse {steps} />
</div>

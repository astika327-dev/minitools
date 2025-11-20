<script lang="ts">
  import HowToUse from "$lib/components/HowToUse.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { Trash2 } from "lucide-svelte";

  const title = "Perencana Detoks Digital";
  const description = "Rencanakan dan lacak waktu istirahat dari layar.";

  const steps = [
    {
        title: "Tetapkan Tujuan Anda",
        description: "Tuliskan tujuan spesifik yang ingin Anda capai, misalnya, 'Tidak ada media sosial setelah jam 9 malam' atau 'Hanya memeriksa email dua kali sehari'."
    },
    {
        title: "Tambahkan Aktivitas Alternatif",
        description: "Daripada tanpa sadar meraih ponsel Anda, rencanakan aktivitas yang menyenangkan untuk dilakukan sebagai gantinya. Contoh: 'Membaca buku', 'Jalan-jalan di taman', atau 'Meditasi'."
    },
    {
        title: "Simpan & Lacak",
        description: "Rencana Anda disimpan secara otomatis di peramban Anda. Kembali kapan saja untuk memeriksa kemajuan Anda, menandai tujuan yang selesai, atau memperbarui rencana Anda."
    }
  ];

  type Goal = {
    text: string;
    completed: boolean;
  };

  let goals: Goal[] = [];
  let alternativeActivities: string[] = [];

  let newGoalText = "";
  let newActivityText = "";

  // Muat data dari localStorage saat komponen dipasang
  onMount(() => {
    if (browser) {
      const storedGoals = localStorage.getItem("digitalDetoxGoals");
      if (storedGoals) {
        goals = JSON.parse(storedGoals);
      }
      const storedActivities = localStorage.getItem("digitalDetoxActivities");
      if (storedActivities) {
        alternativeActivities = JSON.parse(storedActivities);
      }
    }
  });

  // Simpan data ke localStorage setiap kali berubah
  $: if (browser) {
    localStorage.setItem("digitalDetoxGoals", JSON.stringify(goals));
    localStorage.setItem("digitalDetoxActivities", JSON.stringify(alternativeActivities));
  }

  function addGoal() {
    if (newGoalText.trim()) {
      goals = [...goals, { text: newGoalText.trim(), completed: false }];
      newGoalText = "";
    }
  }

  function removeGoal(index: number) {
    goals = goals.filter((_, i) => i !== index);
  }

  function addActivity() {
    if (newActivityText.trim()) {
      alternativeActivities = [...alternativeActivities, newActivityText.trim()];
      newActivityText = "";
    }
  }

  function removeActivity(index: number) {
    alternativeActivities = alternativeActivities.filter((_, i) => i !== index);
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

  <div class="grid gap-8 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Tujuan Detoks Saya</CardTitle>
        <CardDescription>Apa yang ingin Anda capai?</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form on:submit|preventDefault={addGoal} class="flex gap-2">
          <input bind:value={newGoalText} placeholder="Contoh: Kurangi waktu layar..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          <Button type="submit">Tambah</Button>
        </form>
        <div class="space-y-2">
          {#each goals as goal, i}
            <div class="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
              <input type="checkbox" bind:checked={goal.completed} id={`goal-${i}`} class="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
              <label for={`goal-${i}`} class="flex-1 text-sm {goal.completed ? 'line-through text-muted-foreground' : ''}">
                {goal.text}
              </label>
              <Button variant="ghost" size="icon" on:click={() => removeGoal(i)}>
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          {:else}
            <p class="text-sm text-center text-muted-foreground py-4">Belum ada tujuan yang ditambahkan.</p>
          {/each}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Aktivitas Alternatif</CardTitle>
        <CardDescription>Apa yang akan Anda lakukan sebagai gantinya?</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <form on:submit|preventDefault={addActivity} class="flex gap-2">
          <input bind:value={newActivityText} placeholder="Contoh: Membaca buku..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          <Button type="submit">Tambah</Button>
        </form>
        <div class="space-y-2">
          {#each alternativeActivities as activity, i}
            <div class="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                <p class="flex-1 text-sm">{activity}</p>
                <Button variant="ghost" size="icon" on:click={() => removeActivity(i)}>
                    <Trash2 class="h-4 w-4" />
                </Button>
            </div>
            {:else}
              <p class="text-sm text-center text-muted-foreground py-4">Belum ada aktivitas yang ditambahkan.</p>
            {/each}
        </div>
      </CardContent>
    </Card>
  </div>

  <HowToUse {steps} />
</div>

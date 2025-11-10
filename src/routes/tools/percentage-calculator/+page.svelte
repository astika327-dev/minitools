<svelte:head>
  <title>Percentage Calculator</title>
  <meta name="description" content="Calculate percentages for various scenarios" />
</svelte:head>

<script lang="ts">
  import * as Card from "$lib/components/ui/card";

  let percentage = 10;
  let value = 50;
  let result1 = 0;

  $: result1 = (percentage / 100) * value;

  let part = 5;
  let whole = 50;
  let result2 = 0;

  $: result2 = (part / whole) * 100;
</script>

<div class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold text-center my-6">Percentage Calculator</h1>

  <div class="space-y-6">
    <!-- Mode 1 -->
    <Card.Root>
      <Card.Header>
        <Card.Title>What is X% of Y?</Card.Title>
      </Card.Header>
      <Card.Content class="flex items-center gap-4">
        <input type="number" bind:value={percentage} class="w-24 p-2 border rounded-md bg-background" />
        <span>% of</span>
        <input type="number" bind:value={value} class="w-24 p-2 border rounded-md bg-background" />
        <span>=</span>
        <strong class="text-lg">{result1}</strong>
      </Card.Content>
    </Card.Root>

    <!-- Mode 2 -->
    <Card.Root>
      <Card.Header>
        <Card.Title>X is what % of Y?</Card.Title>
      </Card.Header>
      <Card.Content class="flex items-center gap-4">
        <input type="number" bind:value={part} class="w-24 p-2 border rounded-md bg-background" />
        <span>is what % of</span>
        <input type="number" bind:value={whole} class="w-24 p-2 border rounded-md bg-background" />
        <span>=</span>
        <strong class="text-lg">{result2.toFixed(2)}%</strong>
      </Card.Content>
    </Card.Root>
  </div>
</div>

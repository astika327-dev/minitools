<svelte:head>
  <title>BMI Calculator</title>
  <meta name="description" content="Calculate your Body Mass Index" />
</svelte:head>

<script lang="ts">
  import * as Card from "$lib/components/ui/card";

  let height = 175; // cm
  let weight = 70; // kg
  let bmi = 0;
  let category = "";

  function getBmiCategory(bmiValue: number): string {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal weight";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  }

  $: {
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
    category = getBmiCategory(bmi);
  }
</script>

<div class="container mx-auto p-4 max-w-lg">
  <h1 class="text-3xl font-bold text-center my-6">BMI Calculator</h1>

  <Card.Root>
    <Card.Header>
      <Card.Title>Enter Your Details</Card.Title>
    </Card.Header>
    <Card.Content class="space-y-4">
      <div>
        <label for="height" class="block text-sm font-medium">Height (cm)</label>
        <input type="number" id="height" bind:value={height} class="w-full mt-1 p-2 border rounded-md bg-background" />
      </div>
      <div>
        <label for="weight" class="block text-sm font-medium">Weight (kg)</label>
        <input type="number" id="weight" bind:value={weight} class="w-full mt-1 p-2 border rounded-md bg-background" />
      </div>
    </Card.Content>
  </Card.Root>

  <div class="mt-6 text-center">
    <h2 class="text-2xl font-semibold">Your BMI</h2>
    <p class="text-5xl font-bold my-2">{bmi.toFixed(1)}</p>
    <p class="text-xl text-muted-foreground">{category}</p>
  </div>
</div>

<svelte:head>
  <title>Tip Calculator</title>
  <meta name="description" content="Calculate tips for services quickly" />
</svelte:head>

<script lang="ts">
  import * as Card from "$lib/components/ui/card";

  let billAmount = 50;
  let tipPercentage = 15;
  let numberOfPeople = 1;

  let tipAmount = 0;
  let totalAmount = 0;
  let amountPerPerson = 0;

  $: {
    tipAmount = billAmount * (tipPercentage / 100);
    totalAmount = billAmount + tipAmount;
    amountPerPerson = totalAmount / numberOfPeople;
  }
</script>

<div class="container mx-auto p-4 max-w-lg">
  <h1 class="text-3xl font-bold text-center my-6">Tip Calculator</h1>

  <Card.Root>
    <Card.Header>
      <Card.Title>Enter Details</Card.Title>
    </Card.Header>
    <Card.Content class="space-y-4">
      <div>
        <label for="billAmount" class="block text-sm font-medium">Bill Amount</label>
        <input type="number" id="billAmount" bind:value={billAmount} class="w-full mt-1 p-2 border rounded-md bg-background" />
      </div>
      <div>
        <label for="tipPercentage" class="block text-sm font-medium">Tip Percentage (%)</label>
        <input type="number" id="tipPercentage" bind:value={tipPercentage} class="w-full mt-1 p-2 border rounded-md bg-background" />
      </div>
      <div>
        <label for="numberOfPeople" class="block text-sm font-medium">Number of People</label>
        <input type="number" id="numberOfPeople" bind:value={numberOfPeople} min="1" class="w-full mt-1 p-2 border rounded-md bg-background" />
      </div>
    </Card.Content>
  </Card.Root>

  <div class="mt-6">
    <h2 class="text-2xl font-semibold mb-2">Results</h2>
    <Card.Root>
      <Card.Content class="p-6 space-y-2">
        <div class="flex justify-between">
          <span>Tip Amount:</span>
          <strong>{tipAmount.toFixed(2)}</strong>
        </div>
        <div class="flex justify-between">
          <span>Total Amount:</span>
          <strong>{totalAmount.toFixed(2)}</strong>
        </div>
        <div class="flex justify-between text-lg font-bold">
          <span>Amount per Person:</span>
          <span>{amountPerPerson.toFixed(2)}</span>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>

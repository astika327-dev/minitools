<svelte:head>
  <title>Loan Calculator</title>
  <meta name="description" content="Estimate loan payments and amortization" />
</svelte:head>

<script lang="ts">
  import * as Card from "$lib/components/ui/card";

  let loanAmount = 10000;
  let interestRate = 5; // Annual percentage
  let loanTerm = 5; // Years

  let monthlyPayment = 0;
  let totalInterest = 0;
  let totalPayment = 0;

  function calculateLoan() {
    const principal = loanAmount;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyInterestRate > 0 && numberOfPayments > 0) {
      const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      const monthly = (principal * x * monthlyInterestRate) / (x - 1);

      monthlyPayment = monthly;
      totalPayment = monthly * numberOfPayments;
      totalInterest = totalPayment - principal;
    } else {
      monthlyPayment = 0;
      totalPayment = 0;
      totalInterest = 0;
    }
  }

  $: calculateLoan();
</script>

<div class="container mx-auto p-4 max-w-lg">
  <h1 class="text-3xl font-bold text-center my-6">Loan Calculator</h1>

  <Card.Root>
    <Card.Header>
      <Card.Title>Enter Loan Details</Card.Title>
    </Card.Header>
    <Card.Content class="space-y-4">
      <div>
        <label for="loanAmount" class="block text-sm font-medium">Loan Amount</label>
        <input type="number" id="loanAmount" bind:value={loanAmount} class="w-full mt-1 p-2 border rounded-md bg-background" />
      </div>
      <div>
        <label for="interestRate" class="block text-sm font-medium">Annual Interest Rate (%)</label>
        <input type="number" id="interestRate" bind:value={interestRate} class="w-full mt-1 p-2 border rounded-md bg-background" />
      </div>
      <div>
        <label for="loanTerm" class="block text-sm font-medium">Loan Term (Years)</label>
        <input type="number" id="loanTerm" bind:value={loanTerm} min="1" class="w-full mt-1 p-2 border rounded-md bg-background" />
      </div>
    </Card.Content>
  </Card.Root>

  <div class="mt-6">
    <h2 class="text-2xl font-semibold mb-2">Results</h2>
    <Card.Root>
      <Card.Content class="p-6 space-y-2">
        <div class="flex justify-between text-lg font-bold">
          <span>Monthly Payment:</span>
          <span>{monthlyPayment.toFixed(2)}</span>
        </div>
        <hr/>
        <div class="flex justify-between">
          <span>Total Payment:</span>
          <strong>{totalPayment.toFixed(2)}</strong>
        </div>
        <div class="flex justify-between">
          <span>Total Interest:</span>
          <strong>{totalInterest.toFixed(2)}</strong>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>

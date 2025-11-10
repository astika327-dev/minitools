<svelte:head>
  <title>UNIX Timestamp Converter</title>
  <meta name="description" content="Convert UNIX timestamps to human-readable dates and back" />
</svelte:head>

<script lang="ts">
  import HowToUse from '$lib/components/HowToUse.svelte';

  let timestamp = Math.floor(Date.now() / 1000);
  let readableDate = "";

  function convertToDate() {
    // Multiply by 1000 because Date expects milliseconds
    const date = new Date(timestamp * 1000);
    readableDate = date.toUTCString();
  }

  let inputDate = new Date().toISOString().slice(0, 16);
  let convertedTimestamp = 0;

  function convertToTimestamp() {
    const date = new Date(inputDate);
    convertedTimestamp = Math.floor(date.getTime() / 1000);
  }

  $: convertToDate();
  $: convertToTimestamp();

  const steps = [
    "<strong>Timestamp to Date:</strong> Enter a UNIX timestamp (in seconds) in the first field. The human-readable UTC date will be shown below.",
    "<strong>Date to Timestamp:</strong> Use the date and time picker in the second section. The corresponding UNIX timestamp will be generated automatically."
  ];
</script>

<div class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold text-center my-6">UNIX Timestamp Converter</h1>

  <div class="space-y-8">
    <!-- Timestamp to Date -->
    <section>
      <h2 class="text-2xl font-semibold mb-2">Timestamp to Date</h2>
      <div>
        <label for="timestamp" class="block text-sm font-medium">UNIX Timestamp (seconds)</label>
        <input type="number" id="timestamp" bind:value={timestamp} class="w-full mt-1 p-2 border rounded-md bg-background font-mono" />
      </div>
      <div class="mt-2">
        <p class="font-medium">UTC Date:</p>
        <p class="p-2 border rounded-md bg-muted font-mono">{readableDate}</p>
      </div>
    </section>

    <!-- Date to Timestamp -->
    <section>
      <h2 class="text-2xl font-semibold mb-2">Date to Timestamp</h2>
      <div>
        <label for="dateInput" class="block text-sm font-medium">Date and Time (UTC)</label>
        <input type="datetime-local" id="dateInput" bind:value={inputDate} class="w-full mt-1 p-2 border rounded-md bg-background" />
      </div>
       <div class="mt-2">
        <p class="font-medium">UNIX Timestamp:</p>
        <p class="p-2 border rounded-md bg-muted font-mono">{convertedTimestamp}</p>
      </div>
    </section>
  </div>

  <HowToUse {steps} />
</div>

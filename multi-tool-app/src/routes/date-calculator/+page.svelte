<svelte:head>
  <title>Date Calculator</title>
  <meta name="description" content="Calculate the duration between two dates" />
</svelte:head>

<div class="container mx-auto p-4 max-w-lg">
  <h1 class="text-3xl font-bold text-center my-6">Date Calculator</h1>

  <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div class="flex flex-col md:flex-row gap-4 items-center">
      <!-- Start Date -->
      <div class="flex-1 w-full">
        <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
        <input
          type="date"
          id="startDate"
          bind:value={startDate}
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
        />
      </div>

      <!-- End Date -->
      <div class="flex-1 w-full">
        <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
        <input
          type="date"
          id="endDate"
          bind:value={endDate}
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
        />
      </div>
    </div>

    <!-- Result -->
    <div class="mt-6 text-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
      <h2 class="text-2xl font-semibold">Duration</h2>
      <p class="text-xl mt-2">
        {duration.years} years, {duration.months} months, {duration.days} days
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">(Total: {totalDays} days)</p>
    </div>
  </div>
</div>

<script lang="ts">
  // Helper function to format date as YYYY-MM-DD
  function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  let startDate: string = formatDate(new Date());
  let endDate: string = formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 days from now

  let duration = { years: 0, months: 0, days: 0 };
  let totalDays = 0;

  $: {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();

      if (days < 0) {
        months--;
        days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      duration = { years, months, days };

      totalDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    } else {
      duration = { years: 0, months: 0, days: 0 };
      totalDays = 0;
    }
  }
</script>

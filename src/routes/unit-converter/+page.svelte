<svelte:head>
  <title>Unit Converter</title>
  <meta name="description" content="Convert between different units" />
</svelte:head>

<div class="container mx-auto p-4 max-w-lg">
  <h1 class="text-3xl font-bold text-center my-6">Unit Converter</h1>

  <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div class="flex flex-col md:flex-row gap-4 items-center">
      <!-- Input Value -->
      <div class="flex-1 w-full">
        <label for="inputValue" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Value</label>
        <input
          type="number"
          id="inputValue"
          bind:value={inputValue}
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- From Unit -->
      <div class="flex-1 w-full">
        <label for="fromUnit" class="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
        <select
          id="fromUnit"
          bind:value={fromUnit}
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {#each Object.keys(units) as unit}
            <option value={unit}>{unit}</option>
          {/each}
        </select>
      </div>

      <!-- To Unit -->
      <div class="flex-1 w-full">
        <label for="toUnit" class="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
        <select
          id="toUnit"
          bind:value={toUnit}
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {#each Object.keys(units) as unit}
            <option value={unit}>{unit}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Result -->
    <div class="mt-6 text-center">
      <h2 class="text-2xl font-semibold">
        {result}
      </h2>
      <p class="text-gray-600 dark:text-gray-400">{toUnit}</p>
    </div>
  </div>
</div>

<script lang="ts">
  let inputValue: number = 1;
  let fromUnit: string = 'Meters';
  let toUnit: string = 'Kilometers';

  const units = {
    Meters: 1,
    Kilometers: 1000,
    Miles: 1609.34,
    Feet: 0.3048,
    Inches: 0.0254,
  };

  let result: number;

  $: {
    const valueInMeters = inputValue * units[fromUnit];
    result = valueInMeters / units[toUnit];
  }
</script>

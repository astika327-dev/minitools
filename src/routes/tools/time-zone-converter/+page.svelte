<svelte:head>
  <title>Time Zone Converter</title>
  <meta name="description" content="Convert times between different time zones" />
</svelte:head>

<script lang="ts">
  import HowToUse from '$lib/components/HowToUse.svelte';
  import { format, zonedTimeToUtc } from 'date-fns-tz';

  let timeZones = [
    'UTC', 'Europe/London', 'Europe/Berlin', 'Asia/Tokyo',
    'America/New_York', 'America/Chicago', 'America/Los_Angeles'
  ];

  let fromZone = 'America/New_York';
  let toZone = 'Europe/London';
  let inputDate = new Date().toISOString().slice(0, 16);
  let convertedDate = "";

  function convertTime() {
    try {
      const date = new Date(inputDate);
      const utcDate = zonedTimeToUtc(date, fromZone);
      convertedDate = format(utcDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: toZone });
    } catch(e) {
      convertedDate = "Invalid date or time zone."
    }
  }

  $: convertTime();

  const steps = [
    "Select a date and time using the datetime picker.",
    "Choose the 'From' time zone (the zone of the time you entered).",
    "Choose the 'To' time zone (the zone you want to convert to).",
    "The converted date and time will be displayed automatically."
  ];
</script>

<div class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold text-center my-6">Time Zone Converter</h1>

  <div class="space-y-4">
    <div>
      <label for="dateInput" class="block text-sm font-medium">Date and Time</label>
      <input type="datetime-local" id="dateInput" bind:value={inputDate} class="w-full mt-1 p-2 border rounded-md bg-background" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="fromZone" class="block text-sm font-medium">From Time Zone</label>
        <select id="fromZone" bind:value={fromZone} class="w-full mt-1 p-2 border rounded-md bg-background">
          {#each timeZones as zone}
            <option value={zone}>{zone}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="toZone" class="block text-sm font-medium">To Time Zone</label>
        <select id="toZone" bind:value={toZone} class="w-full mt-1 p-2 border rounded-md bg-background">
          {#each timeZones as zone}
            <option value={zone}>{zone}</option>
          {/each}
        </select>
      </div>
    </div>

    <div>
      <p class="font-medium">Converted Time:</p>
      <p class="p-3 border rounded-md bg-muted font-mono text-lg">{convertedDate}</p>
    </div>
  </div>

  <HowToUse {steps} />
</div>

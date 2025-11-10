<svelte:head>
  <title>Color Palette Generator</title>
  <meta name="description" content="Generate beautiful color palettes" />
</svelte:head>

<script lang="ts">
  import HowToUse from '$lib/components/HowToUse.svelte';
  import tinycolor from 'tinycolor2';

  let baseColor = "#ff6f61"; // A nice coral color to start
  let palettes: { name: string, colors: string[] }[] = [];

  function generatePalettes() {
    const color = tinycolor(baseColor);
    palettes = [
      { name: "Analogous", colors: color.analogous().map(c => c.toHexString()) },
      { name: "Monochromatic", colors: color.monochromatic().map(c => c.toHexString()) },
      { name: "Split Complement", colors: color.splitcomplement().map(c => c.toHexString()) },
      { name: "Triad", colors: color.triad().map(c => c.toHexString()) },
      { name: "Tetrad", colors: color.tetrad().map(c => c.toHexString()) },
    ];
  }

  $: generatePalettes();

  const steps = [
    "Pick a base color using the color picker.",
    "Different types of harmonious color palettes (Analogous, Monochromatic, etc.) will be automatically generated based on your selection.",
    "Click on any color swatch to copy its HEX code to your clipboard."
  ];

  function copyColor(color: string) {
    navigator.clipboard.writeText(color);
  }
</script>

<div class="container mx-auto p-4 max-w-4xl">
  <h1 class="text-3xl font-bold text-center my-6">Color Palette Generator</h1>

  <div class="flex flex-col items-center gap-4 mb-8">
    <label for="baseColor" class="font-medium">Choose a Base Color:</label>
    <input
      type="color"
      id="baseColor"
      bind:value={baseColor}
      class="w-24 h-24 rounded-lg border-none p-0 cursor-pointer"
    />
  </div>

  <div class="space-y-6">
    {#each palettes as palette}
      <div>
        <h2 class="text-xl font-semibold mb-2">{palette.name}</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          {#each palette.colors as color}
            <button
              on:click={() => copyColor(color)}
              class="h-24 rounded-lg flex flex-col justify-end p-2 text-white text-sm font-mono shadow-inner hover:scale-105 transition-transform"
              style:background-color={color}
              title="Click to copy {color}"
            >
              <span class="bg-black/30 rounded px-1">{color}</span>
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <HowToUse {steps} />
</div>

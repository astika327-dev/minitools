<svelte:head>
  <title>Color Picker & Converter</title>
  <meta name="description" content="Pick a color and convert it to any format" />
</svelte:head>

<script lang="ts">
  import HowToUse from '$lib/components/HowToUse.svelte';

  let hex = "#ff0000";
  let rgb = "";
  let hsl = "";

  function hexToRgb(h: string): string {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h[1] + h[2], 16);
      g = parseInt(h[3] + h[4], 16);
      b = parseInt(h[5] + h[6], 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

  function hexToHsl(h: string): string {
    let r = 0, g = 0, b = 0;
    if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16);
      g = parseInt(h.substring(3, 5), 16);
      b = parseInt(h.substring(5, 7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let hu = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: hu = (g - b) / d + (g < b ? 6 : 0); break;
        case g: hu = (b - r) / d + 2; break;
        case b: hu = (r - g) / d + 4; break;
      }
      hu /= 6;
    }
    return `hsl(${Math.round(hu * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }

  $: {
    rgb = hexToRgb(hex);
    hsl = hexToHsl(hex);
  }

  const steps = [
    "Use the color picker to visually select a color.",
    "Alternatively, you can type a HEX color code directly into the input field.",
    "The corresponding RGB and HSL values will be automatically generated."
  ];
</script>

<div class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold text-center my-6">Color Picker & Converter</h1>

  <div class="flex flex-col md:flex-row items-center gap-8">
    <input
      type="color"
      bind:value={hex}
      class="w-32 h-32 md:w-48 md:h-48 rounded-lg border-none p-0 cursor-pointer"
      aria-label="Color Picker"
    />
    <div class="flex-1 space-y-4 w-full">
      <div>
        <label for="hex" class="font-semibold">HEX</label>
        <input type="text" id="hex" bind:value={hex} class="w-full mt-1 p-2 border rounded-md bg-muted font-mono" />
      </div>
      <div>
        <label for="rgb" class="font-semibold">RGB</label>
        <input type="text" id="rgb" readonly bind:value={rgb} class="w-full mt-1 p-2 border rounded-md bg-muted font-mono" />
      </div>
      <div>
        <label for="hsl" class="font-semibold">HSL</label>
        <input type="text" id="hsl" readonly bind:value={hsl} class="w-full mt-1 p-2 border rounded-md bg-muted font-mono" />
      </div>
    </div>
  </div>

  <HowToUse {steps} />
</div>

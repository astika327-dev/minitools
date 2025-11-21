<svelte:head>
  <title>Image to Base64 Converter</title>
  <meta name="description" content="Convert images to Base64 data URLs" />
</svelte:head>

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import HowToUse from '$lib/components/HowToUse.svelte';
  import { browser } from '$app/environment';

  let base64String = "";
  let originalImageSrc = "";
  let error = "";

  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      error = "";
      const reader = new FileReader();
      reader.onload = (e) => {
        base64String = e.target?.result as string;
        originalImageSrc = base64String;
      };
      reader.onerror = () => {
        error = "Failed to read the file.";
      };
      reader.readAsDataURL(file);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(base64String);
  }

  const steps = [
    "Click the <strong>Choose File</strong> button and select an image from your device.",
    "The image will be converted to a Base64 Data URL and displayed in the text area below.",
    "A preview of your uploaded image will also be shown.",
    "Click the <strong>Copy</strong> button to copy the Base64 string to your clipboard."
  ];
</script>

{#if browser}
<div class="container mx-auto p-4 max-w-3xl">
  <h1 class="text-3xl font-bold text-center my-6">Image to Base64 Converter</h1>

  <div class="space-y-4">
    <input
      type="file"
      accept="image/*"
      on:change={handleFileUpload}
      class="w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-primary/10 file:text-primary
        hover:file:bg-primary/20"
    />
    {#if error}
      <p class="text-destructive">{error}</p>
    {/if}

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <div>
        <label for="base64-output" class="font-semibold">Base64 Data URL</label>
        <textarea
          id="base64-output"
          readonly
          bind:value={base64String}
          rows="10"
          class="w-full mt-1 p-2 border rounded-md bg-muted font-mono"
        ></textarea>
        {#if base64String}
          <Button on:click={copyToClipboard} class="mt-2 w-full">Copy</Button>
        {/if}
      </div>
      <div>
        <label for="image-preview" class="font-semibold">Image Preview</label>
        {#if originalImageSrc}
          <img id="image-preview" src={originalImageSrc} alt="Uploaded preview" class="mt-1 rounded-md border max-h-64" />
        {/if}
      </div>
    </div>
  </div>

  <HowToUse {steps} />
</div>
{/if}

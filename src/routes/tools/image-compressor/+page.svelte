<svelte:head>
  <title>Image Compressor</title>
  <meta name="description" content="Compress JPEG and PNG images in your browser" />
</svelte:head>

<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import HowToUse from '$lib/components/HowToUse.svelte';

  let quality = 0.75;
  let originalFile: File | null = null;
  let originalImageSrc = "";
  let compressedImageSrc = "";
  let originalSize = 0;
  let compressedSize = 0;

  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      originalFile = file;
      originalSize = file.size;
      const reader = new FileReader();
      reader.onload = (e) => {
        originalImageSrc = e.target?.result as string;
        compressImage();
      };
      reader.readAsDataURL(file);
    }
  }

  function compressImage() {
    if (!originalImageSrc) return;

    const img = new Image();
    img.src = originalImageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          compressedSize = blob.size;
          compressedImageSrc = URL.createObjectURL(blob);
        }
      }, originalFile?.type, quality);
    };
  }

  $: if(originalFile) compressImage();

  const steps = [
    "Upload a JPEG or PNG image using the <strong>Choose File</strong> button.",
    "Use the slider to adjust the compression quality (0 is lowest, 1 is highest).",
    "The compressed image and its new size will be shown.",
    "Click the <strong>Download Compressed Image</strong> button to save it."
  ];
</script>

<div class="container mx-auto p-4 max-w-4xl">
  <h1 class="text-3xl font-bold text-center my-6">Image Compressor</h1>

  <div class="space-y-6">
     <input
      type="file"
      accept="image/jpeg, image/png"
      on:change={handleFileUpload}
      class="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
    />

    {#if originalImageSrc}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h2 class="text-xl font-semibold">Original Image</h2>
          <p class="text-sm text-muted-foreground">Size: {(originalSize / 1024).toFixed(2)} KB</p>
          <img src={originalImageSrc} alt="Original" class="mt-2 rounded-md border max-w-full" />
        </div>
        <div>
          <h2 class="text-xl font-semibold">Compressed Image</h2>
           <p class="text-sm text-muted-foreground">Size: {(compressedSize / 1024).toFixed(2)} KB</p>
          <img src={compressedImageSrc} alt="Compressed" class="mt-2 rounded-md border max-w-full" />
        </div>
      </div>

      <div class="space-y-2">
        <label for="quality" class="font-medium">Compression Quality: {quality.toFixed(2)}</label>
        <input type="range" id="quality" bind:value={quality} min="0" max="1" step="0.05" class="w-full" />
      </div>

      <a href={compressedImageSrc} download={`compressed-${originalFile?.name}`}>
        <Button class="w-full">Download Compressed Image</Button>
      </a>
    {/if}
  </div>

  <HowToUse {steps} />
</div>

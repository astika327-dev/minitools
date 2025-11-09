<svelte:head>
  <title>QR Code Generator</title>
  <meta name="description" content="Create QR codes from text or URLs" />
</svelte:head>

<div class="container mx-auto p-4 max-w-lg">
  <h1 class="text-3xl font-bold text-center my-6">QR Code Generator</h1>

  <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <textarea
      bind:value={text}
      rows="4"
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
      placeholder="Enter text or URL here..."
    ></textarea>

    <div class="mt-4 flex justify-center">
      <canvas bind:this={canvas}></canvas>
    </div>
  </div>
</div>

<script lang="ts">
  import QRCode from 'qrcode';
  import { onMount } from 'svelte';

  let text = 'https://www.example.com';
  let canvas: HTMLCanvasElement;

  function generateQRCode() {
    if (canvas) {
      QRCode.toCanvas(canvas, text, { width: 256 }, (error) => {
        if (error) console.error(error);
      });
    }
  }

  // Generate QR code on mount and whenever the text changes
  onMount(generateQRCode);
  $: if (text) generateQRCode();
</script>

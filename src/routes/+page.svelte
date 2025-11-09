<svelte:head>
  <title>Multi Tool App</title>
  <meta name="description" content="A collection of useful tools" />
</svelte:head>

<div class="container mx-auto p-4">
  <h1 class="text-4xl font-bold text-center my-8">Multi Tool App</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Calculator -->
    <a href="/calculator" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-2xl font-semibold mb-2">Calculator</h2>
      <p class="text-gray-600 dark:text-gray-400">A simple calculator for your daily needs.</p>
    </a>

    <!-- Unit Converter -->
    <a href="/unit-converter" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-2xl font-semibold mb-2">Unit Converter</h2>
      <p class="text-gray-600 dark:text-gray-400">Convert between different units of measurement.</p>
    </a>

    <!-- Word Counter -->
    <a href="/word-counter" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-2xl font-semibold mb-2">Word Counter</h2>
      <p class="text-gray-600 dark:text-gray-400">Count words and characters in your text.</p>
    </a>

    <!-- Password Generator -->
    <a href="/password-generator" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-2xl font-semibold mb-2">Password Generator</h2>
      <p class="text-gray-600 dark:text-gray-400">Generate strong and secure passwords.</p>
    </a>

    <!-- QR Code Generator -->
    <a href="/qr-code-generator" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-2xl font-semibold mb-2">QR Code Generator</h2>
      <p class="text-gray-600 dark:text-gray-400">Create QR codes from text or URLs.</p>
    </a>

    <!-- Date Calculator -->
    <a href="/date-calculator" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-2xl font-semibold mb-2">Date Calculator</h2>
      <p class="text-gray-600 dark:text-gray-400">Calculate the duration between two dates.</p>
    </a>

    <!-- Markdown Editor -->
    <a href="/markdown-editor" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 class="text-2xl font-semibold mb-2">Markdown Editor</h2>
      <p class="text-gray-600 dark:text-gray-400">A simple markdown editor with live preview.</p>
    </a>
  </div>
</div>

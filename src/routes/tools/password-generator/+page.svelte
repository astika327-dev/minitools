<svelte:head>
  <title>Password Generator</title>
  <meta name="description" content="Generate strong and secure passwords" />
</svelte:head>

<div class="container mx-auto p-4 max-w-lg">
  <h1 class="text-3xl font-bold text-center my-6">Password Generator</h1>

  <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div class="flex items-center mb-4">
      <input
        type="text"
        readonly
        bind:value={password}
        class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-200 dark:bg-gray-700"
      />
      <button on:click={copyToClipboard} class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md">
        {copyText}
      </button>
    </div>

    <div class="space-y-4">
      <!-- Length -->
      <div class="flex items-center justify-between">
        <label for="length">Password Length:</label>
        <input type="number" id="length" bind:value={length} min="4" max="64" class="w-20 p-1 border rounded" />
      </div>
      <input type="range" bind:value={length} min="4" max="64" class="w-full" />

      <!-- Options -->
      <div class="flex items-center">
        <input type="checkbox" id="includeUppercase" bind:checked={includeUppercase} class="mr-2" />
        <label for="includeUppercase">Include Uppercase Letters</label>
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="includeLowercase" bind:checked={includeLowercase} class="mr-2" />
        <label for="includeLowercase">Include Lowercase Letters</label>
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="includeNumbers" bind:checked={includeNumbers} class="mr-2" />
        <label for="includeNumbers">Include Numbers</label>
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="includeSymbols" bind:checked={includeSymbols} class="mr-2" />
        <label for="includeSymbols">Include Symbols</label>
      </div>

      <button on:click={generatePassword} class="w-full mt-4 p-3 bg-green-500 hover:bg-green-600 text-white rounded-md text-lg">
        Generate Password
      </button>
    </div>
  </div>
</div>

<script lang="ts">
  let length = 16;
  let includeUppercase = true;
  let includeLowercase = true;
  let includeNumbers = true;
  let includeSymbols = true;
  let password = '';
  let copyText = 'Copy';

  const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  function generatePassword() {
    let charset = '';
    if (includeUppercase) charset += chars.uppercase;
    if (includeLowercase) charset += chars.lowercase;
    if (includeNumbers) charset += chars.numbers;
    if (includeSymbols) charset += chars.symbols;

    if (charset === '') {
      password = 'Select at least one option';
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    password = newPassword;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password).then(() => {
      copyText = 'Copied!';
      setTimeout(() => (copyText = 'Copy'), 2000);
    });
  }

  // Generate a password on initial load
  generatePassword();
</script>

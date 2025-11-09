<svelte:head>
  <title>Calculator</title>
  <meta name="description" content="A simple calculator" />
</svelte:head>

<div class="container mx-auto p-4 max-w-md">
  <h1 class="text-3xl font-bold text-center my-6">Calculator</h1>

  <div class="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-inner mb-4">
    <input
      type="text"
      bind:value={display}
      class="w-full text-right text-4xl bg-transparent text-gray-800 dark:text-gray-200"
      readonly
    />
  </div>

  <div class="grid grid-cols-4 gap-4">
    <button on:click={() => clear()} class="col-span-2 p-4 text-xl bg-red-400 hover:bg-red-500 rounded-lg">C</button>
    <button on:click={() => del()} class="p-4 text-xl bg-gray-400 hover:bg-gray-500 rounded-lg">DEL</button>
    <button on:click={() => append('/')} class="p-4 text-xl bg-orange-400 hover:bg-orange-500 rounded-lg">/</button>

    <button on:click={() => append('7')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">7</button>
    <button on:click={() => append('8')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">8</button>
    <button on:click={() => append('9')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">9</button>
    <button on:click={() => append('*')} class="p-4 text-xl bg-orange-400 hover:bg-orange-500 rounded-lg">*</button>

    <button on:click={() => append('4')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">4</button>
    <button on:click={() => append('5')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">5</button>
    <button on:click={() => append('6')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">6</button>
    <button on:click={() => append('-')} class="p-4 text-xl bg-orange-400 hover:bg-orange-500 rounded-lg">-</button>

    <button on:click={() => append('1')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">1</button>
    <button on:click={() => append('2')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">2</button>
    <button on:click={() => append('3')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">3</button>
    <button on:click={() => append('+')} class="p-4 text-xl bg-orange-400 hover:bg-orange-500 rounded-lg">+</button>

    <button on:click={() => append('0')} class="col-span-2 p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">0</button>
    <button on:click={() => append('.')} class="p-4 text-xl bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 rounded-lg">.</button>
    <button on:click={() => calculate()} class="p-4 text-xl bg-green-400 hover:bg-green-500 rounded-lg">=</button>
  </div>
</div>

<script lang="ts">
  let display = '0';

  function append(char: string) {
    if (display === '0' && char !== '.') {
      display = char;
    } else {
      display += char;
    }
  }

  function clear() {
    display = '0';
  }

  function del() {
    display = display.slice(0, -1);
    if (display === '') {
      display = '0';
    }
  }

  function calculate() {
    try {
      // A simple and safe parser for basic math operations
      const sanitizedExpression = display.replace(/[^-()\d/*+.]/g, '');
      if (sanitizedExpression !== display) {
        display = 'Error';
        return;
      }
      display = new Function('return ' + sanitizedExpression)();
    } catch (e) {
      display = 'Error';
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key >= '0' && event.key <= '9' || event.key === '.' || event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      append(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault(); // prevent form submission
      calculate();
    } else if (event.key === 'Backspace') {
      del();
    } else if (event.key === 'Delete' || event.key === 'c' || event.key === 'C') {
      clear();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

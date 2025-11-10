<svelte:head>
  <title>Calculator</title>
  <meta name="description" content="A simple calculator" />
</svelte:head>

<script lang="ts">
  import {
    getInitialState,
    appendChar,
    clearDisplay,
    deleteLastChar,
    calculateResult,
  } from '$lib/logic/calculator';
  import { Button } from '$lib/components/ui/button';

  let state = getInitialState();

  function handleAppend(char: string) {
    state = appendChar(state, char);
  }

  function handleClear() {
    state = clearDisplay(state);
  }

  function handleDelete() {
    state = deleteLastChar(state);
  }

  function handleCalculate() {
    state = calculateResult(state);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key >= '0' && event.key <= '9' || event.key === '.' || ['+', '-', '*', '/'].includes(event.key)) {
      handleAppend(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      handleCalculate();
    } else if (event.key === 'Backspace') {
      handleDelete();
    } else if (event.key === 'Delete' || event.key.toLowerCase() === 'c') {
      handleClear();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container mx-auto p-4 max-w-md">
  <h1 class="text-3xl font-bold text-center my-6">Calculator</h1>

  <div class="bg-muted p-4 rounded-lg shadow-inner mb-4">
    <input
      type="text"
      value={state.display}
      class="w-full text-right text-4xl bg-transparent text-foreground"
      readonly
    />
  </div>

  <div class="grid grid-cols-4 gap-4">
    <Button on:click={handleClear} variant="destructive" class="col-span-2">C</Button>
    <Button on:click={handleDelete} variant="secondary">DEL</Button>
    <Button on:click={() => handleAppend('/')} variant="outline">/</Button>

    <Button on:click={() => handleAppend('7')}>7</Button>
    <Button on:click={() => handleAppend('8')}>8</Button>
    <Button on:click={() => handleAppend('9')}>9</Button>
    <Button on:click={() => handleAppend('*')} variant="outline">*</Button>

    <Button on:click={() => handleAppend('4')}>4</Button>
    <Button on:click={() => handleAppend('5')}>5</Button>
    <Button on:click={() => handleAppend('6')}>6</Button>
    <Button on:click={() => handleAppend('-')} variant="outline">-</Button>

    <Button on:click={() => handleAppend('1')}>1</Button>
    <Button on:click={() => handleAppend('2')}>2</Button>
    <Button on:click={() => handleAppend('3')}>3</Button>
    <Button on:click={() => handleAppend('+')} variant="outline">+</Button>

    <Button on:click={() => handleAppend('0')} class="col-span-2">0</Button>
    <Button on:click={() => handleAppend('.')}>.</Button>
    <Button on:click={handleCalculate} variant="default">=</Button>
  </div>
</div>

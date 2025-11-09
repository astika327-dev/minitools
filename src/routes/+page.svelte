<svelte:head>
  <title>Multi Tool App</title>
  <meta name="description" content="A collection of useful tools" />
</svelte:head>

<script lang="ts">
  import * as Card from "$lib/components/ui/card";

  const tools = [
    {
      href: "/calculator",
      title: "Calculator",
      description: "A simple calculator for your daily needs.",
    },
    {
      href: "/unit-converter",
      title: "Unit Converter",
      description: "Convert between different units of measurement.",
    },
    {
      href: "/word-counter",
      title: "Word Counter",
      description: "Count words and characters in your text.",
    },
    {
      href: "/password-generator",
      title: "Password Generator",
      description: "Generate strong and secure passwords.",
    },
    {
      href: "/qr-code-generator",
      title: "QR Code Generator",
      description: "Create QR codes from text or URLs.",
    },
    {
      href: "/date-calculator",
      title: "Date Calculator",
      description: "Calculate the duration between two dates.",
    },
    {
      href: "/markdown-editor",
      title: "Markdown Editor",
      description: "A simple markdown editor with live preview.",
    },
  ];
</script>

<div class="container mx-auto p-4">
  <h1 class="text-4xl font-bold text-center my-8">Multi Tool App</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each tools as tool}
      <a href={tool.href} class="block hover:scale-105 transition-transform">
        <Card.Root>
          <Card.Header>
            <Card.Title>{tool.title}</Card.Title>
            <Card.Description>{tool.description}</Card.Description>
          </Card.Header>
        </Card.Root>
      </a>
    {/each}
  </div>
</div>

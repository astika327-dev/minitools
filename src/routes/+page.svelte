<svelte:head>
  <title>Multi Tool App</title>
  <meta name="description" content="A collection of useful tools" />
</svelte:head>

<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import {
    Calculator,
    Ruler,
    CalendarDays,
    Pilcrow,
    Text,
    KeyRound,
    QrCode,
  } from "lucide-svelte";

  const toolGroups = [
    {
      title: "Calculations & Conversions",
      tools: [
        {
          href: "/calculator",
          title: "Calculator",
          description: "A simple calculator for your daily needs.",
          icon: Calculator,
        },
        {
          href: "/unit-converter",
          title: "Unit Converter",
          description: "Convert between different units of measurement.",
          icon: Ruler,
        },
        {
          href: "/date-calculator",
          title: "Date Calculator",
          description: "Calculate the duration between two dates.",
          icon: CalendarDays,
        },
      ],
    },
    {
      title: "Text & Content",
      tools: [
        {
          href: "/word-counter",
          title: "Word Counter",
          description: "Count words and characters in your text.",
          icon: Pilcrow,
        },
        {
          href: "/markdown-editor",
          title: "Markdown Editor",
          description: "A simple markdown editor with live preview.",
          icon: Text,
        },
      ],
    },
    {
      title: "Web & Security Utilities",
      tools: [
        {
          href: "/password-generator",
          title: "Password Generator",
          description: "Generate strong and secure passwords.",
          icon: KeyRound,
        },
        {
          href: "/qr-code-generator",
          title: "QR Code Generator",
          description: "Create QR codes from text or URLs.",
          icon: QrCode,
        },
      ],
    },
  ];
</script>

<div class="container mx-auto p-4">
  <h1 class="text-4xl font-bold text-center my-8">Multi Tool App</h1>

  <div class="space-y-12">
    {#each toolGroups as group}
      <section>
        <h2 class="text-2xl font-semibold mb-4 border-b pb-2">{group.title}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each group.tools as tool}
            <a href={tool.href} class="block group">
              <Card.Root class="transition-all duration-200 ease-in-out group-hover:shadow-lg group-hover:border-primary h-full">
                <Card.Header>
                  <Card.Title class="flex items-center gap-2">
                    <svelte:component this={tool.icon} class="w-5 h-5" />
                    <span>{tool.title}</span>
                  </Card.Title>
                  <Card.Description>{tool.description}</Card.Description>
                </Card.Header>
              </Card.Root>
            </a>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</div>

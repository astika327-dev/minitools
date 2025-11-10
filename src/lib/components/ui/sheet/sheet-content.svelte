<script lang="ts">
  import { Drawer as SheetPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";
  import { tv, type VariantProps } from "tailwind-variants";
  import { X } from "lucide-svelte";

  type Props = SheetPrimitive.ContentProps;
  type Events = SheetPrimitive.ContentEvents;

  let className: string | undefined | null = undefined;
  export { className as class };

  export let side: VariantProps<typeof sheetVariants>["side"] = "right";

  const sheetVariants = tv({
    base: "fixed z-50 gap-4 bg-background p-6 shadow-lg",
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  });
</script>

<SheetPrimitive.Portal>
  <SheetPrimitive.Overlay
    class="fixed inset-0 z-50 bg-black/80"
    transitionConfig={{
      duration: 150,
    }}
  />
  <SheetPrimitive.Content
    {...$$restProps}
    class={cn(sheetVariants({ side }), className)}
    transitionConfig={{
      duration: 300,
    }}
    on:m-open
    on:m-close
    on:m-escape
    on:m-pointerdown
    on:m-focusout
  >
    <slot />
    <SheetPrimitive.Close
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </SheetPrimitive.Close>
  </SheetPrimitive.Content>
</SheetPrimitive.Portal>

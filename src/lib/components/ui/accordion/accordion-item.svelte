<script lang="ts">
  import { Accordion as AccordionPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<AccordionPrimitive.Item
  class={cn("border-b", className)}
  {...$$restProps}
>
  <slot />
</AccordionPrimitive.Item>

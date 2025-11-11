<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = SheetPrimitive.TitleProps;

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<SheetPrimitive.Title
  {...$$restProps}
  class={cn("text-lg font-semibold text-foreground", className)}
  asChild
  let:builder
>
  <h2 {...builder} use:builder.action>
    <slot />
  </h2>
</SheetPrimitive.Title>

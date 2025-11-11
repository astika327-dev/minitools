<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = SheetPrimitive.DescriptionProps;

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<SheetPrimitive.Description
  {...$$restProps}
  class={cn("text-sm text-muted-foreground", className)}
  asChild
  let:builder
>
  <p {...builder} use:builder.action>
    <slot />
  </p>
</SheetPrimitive.Description>

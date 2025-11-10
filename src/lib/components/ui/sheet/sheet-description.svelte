<script lang="ts">
  import { Drawer as SheetPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = SheetPrimitive.DescriptionProps;

  let className: string | undefined | null = undefined;
  export { className as class };

  let props: Props = {
    ...$$restProps,
  };
</script>

<SheetPrimitive.Description
  {...props}
  class={cn("text-sm text-muted-foreground", className)}
>
  <slot />
</SheetPrimitive.Description>

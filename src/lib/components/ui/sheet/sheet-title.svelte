<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = SheetPrimitive.TitleProps;

  let className: string | undefined | null = undefined;
  export { className as class };

  let props: Props = {
    ...$$restProps,
  };
</script>

<SheetPrimitive.Title
  {...props}
  class={cn("text-lg font-semibold text-foreground", className)}
>
  <slot />
</SheetPrimitive.Title>

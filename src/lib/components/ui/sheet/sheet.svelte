<script lang="ts">
  import { Drawer as SheetPrimitive } from "bits-ui";

  type Props = SheetPrimitive.Props;

  let props: Props = {
    ...$$restProps,
    closeOnOutsideClick: true,
  };
</script>

<SheetPrimitive.Root {...props}>
  <slot />
</SheetPrimitive.Root>

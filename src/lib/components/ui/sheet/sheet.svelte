<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";

  type Props = SheetPrimitive.Props;
  type Events = SheetPrimitive.Events;

  let props: Props = {
    ...$$restProps,
    closeOnOutsideClick: true,
    portal: undefined,
  };
</script>

<SheetPrimitive.Root {...props} let:ids>
  <slot {ids} />
</SheetPrimitive.Root>

<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";

  type Props = SheetPrimitive.TriggerProps;
  type Events = SheetPrimitive.TriggerEvents;
</script>

<SheetPrimitive.Trigger {...$$restProps} asChild let:builder on:m-click on:m-keydown>
  <slot {builder} />
</SheetPrimitive.Trigger>

<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";

  type Props = SheetPrimitive.TriggerProps;
  type Events = SheetPrimitive.TriggerEvents;

  let props: Props = {
    ...$$restProps,
  };
</script>

<SheetPrimitive.Trigger {...props} on:m-click on:m-keydown>
  <slot />
</SheetPrimitive.Trigger>

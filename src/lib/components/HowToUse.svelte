<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion";

  export let title = "How to Use";
  export let steps: string[];
</script>

<div class="mt-8">
  <Accordion.Root>
    <Accordion.Item value="item-1">
      <Accordion.Trigger>{title}</Accordion.Trigger>
      <Accordion.Content>
        <ol class="list-decimal list-inside space-y-2">
          {#each steps as step}
            <li>{@html step}</li>
          {/each}
        </ol>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</div>

<Carousel items={$domains} left={$direction === 'LEFT'} width={320} gap={16}>
  <DomainItem slot="item" let:item let:index {item} {index} intro bind:ready={itemsReady[index]} />
</Carousel>
{#if ready}<div class="fixed bottom-4 lg:hidden" transition:fly={{y: 16, duration: 700}}><DomainControls /></div>{/if}

<script lang="ts">
  import {Carousel, DomainControls, DomainItem} from '$lib/components';
  import {direction, domains} from '$lib/store';
  import {onMount} from 'svelte';
  import {fly} from 'svelte/transition';

  // VARS ==================================================================================================================================
  let itemsReady: Promise<boolean>[] = [];
  let ready = false;

  // LIFECYCLE =============================================================================================================================
  onMount(async () => (ready = (await Promise.all(itemsReady)).every((r) => r)));
</script>

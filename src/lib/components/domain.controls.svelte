<div class="flex justify-center items-center {elC}">
  <button class={btnC} on:click={previous}><i class={iconC}><FaAngleLeft /></i></button>
  <div class={badgeC}>{$selectedDomain.title}</div>
  <button class={btnC} on:click={next}><i class={iconC}><FaAngleRight /></i></button>
</div>

<script lang="ts">
  import FaAngleLeft from 'svelte-icons/fa/FaAngleLeft.svelte';
  import FaAngleRight from 'svelte-icons/fa/FaAngleRight.svelte';

  import {next, previous, selectedColor, selectedDomain} from '$lib/store';

  // PROPS =================================================================================================================================
  let elC = '';
  export {elC as class};

  // STYLES ================================================================================================================================
  const transitionC = 'transition-colors duration-700';
  const commonC = `flex justify-center items-center rounded-full shadow-xl bg-${$selectedColor}-300 text-white ${transitionC}`;
  $: badgeC = `mx-4 w-40 py-1 uppercase ${commonC}`;
  $: btnC = `w-12 h-12 ${commonC} hover:bg-${$selectedColor}-400`;
  const iconC = 'w-6 h-6';
</script>

<div class="w-80 {elC}" {...elA}>
  <div class="relative w-full h-full" {...innerA}>
    <div class="{cardC} justify-center" style="backface-visibility:hidden">
      <Picture alt="logo de níama stratégies" {...strategies} class="w-64 h-64" />
    </div>
    <div class={cardC} style="transform:rotateY(180deg);backface-visibility:hidden">
      <Picture {...image} class="w-64 h-64" />
      <p class="mt-8 text-center">{@html content}</p>
      <ul class="w-full p-4 mt-4 bg-gray-100 rounded-lg">
        <li class={itemC}><i class={iconC}><FaUserTie /></i>{name}</li>
        <li><a href="tel:{phone}" class={itemC}><i class={iconC}><FaPhone /></i>{phone}</a></li>
        <li><a href="mailto:{email}" class={itemC}><i class={iconC}><FaEnvelope /></i>{email}</a></li>
      </ul>
    </div>
  </div>
</div>

<script lang="ts">
  import {onMount} from 'svelte';
  import {quadInOut} from 'svelte/easing';
  import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte';
  import FaPhone from 'svelte-icons/fa/FaPhone.svelte';
  import FaUserTie from 'svelte-icons/fa/FaUserTie.svelte';
  import {tweened} from 'svelte/motion';

  import strategies from '../assets/images/strategies.png?domain';
  import {getColor} from '$lib/store';
  import type {Domain} from '$lib/types';
  import Picture from './picture.svelte';

  // PROPS =================================================================================================================================
  let elC = '';
  export {elC as class};
  export let index: number;
  export let intro = false;
  export let item: Domain;
  $: ({content, image, type, email, name, phone} = item);

  // READONLY ==============================================================================================================================
  let readyResolve: (r: boolean) => void;
  export const ready = new Promise<boolean>((r) => (readyResolve = r));

  // STYLES ================================================================================================================================
  $: iconC = `mr-2 w-4 text-${getColor(type)}-300`;
  const cardC = `absolute inset-0 flex flex-col items-center bg-white rounded-2xl shadow-2xl overflow-hidden p-8`;
  const itemC = 'flex items-center';

  // ANIMATE ===============================================================================================================================
  const A0 = tweened(intro ? -110 : 0, {duration: 700, easing: quadInOut});
  const A1 = tweened(intro ? 0 : 180, {duration: 700, easing: quadInOut});
  const A2 = tweened(intro ? 320 : 544, {duration: 700, easing: quadInOut});

  $: elA = {style: `height:${$A2}px;perspective:1000px;transform: translateX(${$A0 * (index - 1)}%)`};
  $: innerA = {style: `transform-style: preserve-3d;transform: rotateY(${$A1}deg)`};

  // LIFECYCLE =============================================================================================================================
  onMount(async () => {
    if (intro) {
      await A0.set(0);
      await A1.set(180);
      await A2.set(544);
    }
    readyResolve(true);
  });
</script>

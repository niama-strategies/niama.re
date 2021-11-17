<div class={elC}>
  <ul class="relative flex">
    {#each ['left', 'right'] as dir, i}<div class="absolute" style={extraS(dir, i)}><slot name="item" item={extra[i]} /></div>{/each}
    {#each items as item, index (item.type)}<li style={itemS} animate:flip><slot name="item" {item} {index} /></li>{/each}
  </ul>
  <div class="{effectC} left-0 bg-gradient-to-r" />
  <div class="{effectC} right-0 bg-gradient-to-l" />
</div>

<script lang="ts">
  import {quadInOut} from 'svelte/easing';
  import {tweened} from 'svelte/motion';

  // PROPS =================================================================================================================================
  let elC = '';
  export {elC as class};
  export let duration = 700;
  export let easing = quadInOut;
  export let gap: number;
  export let items: any[];
  export let left = true;
  export let width: number;

  // STYLES ================================================================================================================================
  $: extraS = (dir: string, i: number) => `${dir}:${gap}px;opacity:${showExtra[i] ? 1 : 0};transform: translateX(${$flyExtra[i]}px)`;
  $: itemS = `flex: none;margin: 0 ${gap}px`;
  $: effectC = `hidden fixed inset-y-0 w-[calc(40vw-160px)] from-white to-transparent pointer-events-none`;

  // VARS ==================================================================================================================================
  let extra = [items[0], items[items.length - 1]];
  let showExtra = [false, false];
  $: x = (left ? 1 : -1) * (width + 2 * gap);

  // ANIMATE ===============================================================================================================================
  const flyExtra = tweened([0, 0], {easing, duration: 1});

  const animateExtra = async (index: number) => {
    resetExtra(items[items.length - 1], items[0]);
    showExtra[index] = true;
    await flyExtra.set(index === 0 ? [-x, 0] : [0, -x], {duration});
    resetExtra(items[0], items[items.length - 1]);
  };

  const flip = (_node: HTMLElement, {from, to}: {from: DOMRect; to: DOMRect}, _item: any) => {
    if (left && from.x < to.x) animateExtra(0);
    else if (!left && to.x < from.x) animateExtra(1);
    return {duration, easing, css: (_t: number, u: number) => `transform: translateX(${u * x}px)`};
  };

  const resetExtra = (first: any, last: any) => {
    showExtra = [false, false];
    $flyExtra = [0, 0];
    extra = [first, last];
  };
</script>

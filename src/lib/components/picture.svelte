<picture class="block {elC}">
  {#each sources as {sizes = '100vw', srcset, type}}<source {type} {sizes} {srcset} />{/each}
  <img
    {alt}
    {loading}
    decoding="async"
    {src}
    class="block w-full h-full {loaded ? '' : 'blur-lg'} {cover ? 'object-cover' : ''} bg-cover lazy"
    style={loaded ? '' : `background-image:url(${placeholder})`}
    on:load={onLoad}
    bind:this={imgEl}
    {...$$restProps}
  />
</picture>

<script lang="ts">
  // PROPS =================================================================================================================================
  let elC = '';
  export {elC as class};
  export let alt: string;
  export let cover = false;
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let placeholder: string;
  export let sources: {sizes?: string; srcset: string; type: string}[];
  export let src: string;

  // VARS ==================================================================================================================================
  let imgEl: HTMLImageElement;
  let loaded = imgEl?.complete ?? false;

  // EVENTS ================================================================================================================================
  const onLoad = () => (loaded = true);
</script>

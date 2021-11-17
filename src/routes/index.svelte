<svelte:head>
  <title>níama stratégies</title>
  <meta name="description" content={description} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
</svelte:head>
<DomainList />

<script lang="ts">
  import {DomainList} from '$lib/components';

  const description = `níama stratégies vous propose ses services et vous accompagne dans la conception et l'électronique avec níama 
  conception, le développement applicatif avec níama développement, et enfin l'architecture et l'ingénierie en bâtiment avec níama 
  ingénierie.`;
</script>

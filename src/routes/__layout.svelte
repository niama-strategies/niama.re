<Picture cover alt="Fond níama strategies" {...bg} class="fixed inset-0" />
<div class="flex items-center justify-center min-h-screen overflow-hidden">
  <slot />
</div>

<script lang="ts">
  import bg from '$lib/assets/images/bg.png?bg';
  import {Picture} from '$lib/components';
  import '../app.css';
</script>

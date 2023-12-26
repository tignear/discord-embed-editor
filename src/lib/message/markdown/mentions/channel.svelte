<script lang="ts">
	import Mention from './mention.svelte';
	export let node: { id: string };
</script>

<Mention>#{node.id}</Mention>

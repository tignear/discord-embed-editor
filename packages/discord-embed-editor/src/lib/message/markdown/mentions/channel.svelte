<script lang="ts">
	import Mention from './mention.svelte';
	interface Props {
		node: { id: string };
	}

	let { node }: Props = $props();
</script>

<Mention>#{node.id}</Mention>

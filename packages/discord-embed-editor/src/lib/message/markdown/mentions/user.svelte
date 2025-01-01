<script lang="ts">
	import AtMention from './at-mention.svelte';
	interface Props {
		node: {id: string};
	}

	let { node }: Props = $props();
</script>

<AtMention text={node.id}></AtMention>

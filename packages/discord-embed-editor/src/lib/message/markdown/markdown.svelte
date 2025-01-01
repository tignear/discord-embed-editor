<script lang="ts">
	import parse from 'discord-markdown-parser';
	import Node from './node.svelte';
	interface Props {
		content: string;
		target?: 'content' | 'embedField';
	}

	let { content, target = 'content' }: Props = $props();
	let node = $derived(parse(content, target));
</script>

<div>
	<Node {node}></Node>
</div>

<style>
	div {
		font-size: 1rem;
		line-height: 1.375em;
	}
</style>

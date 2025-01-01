<script lang="ts">
	import parse from 'discord-markdown-parser';
	import Node from './node.svelte';
	export let content: string;
	export let target: 'content' | 'embedField' = 'content';
	$: node = parse(content, target);
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

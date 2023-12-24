<script lang="ts">
	import parse from 'discord-markdown-parser';
	import Node from './node.svelte';
	export let content: string;
	$: node = parse(content);
	$: {
		console.log(node);
	}
</script>

<Node {node}></Node>

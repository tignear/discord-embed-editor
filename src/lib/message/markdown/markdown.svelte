<script lang="ts">
	import parse from 'discord-markdown-parser';
	import Node from './node.svelte';
	export let content: string;
	$: node = parse(content);
</script>

<Node {node}></Node>

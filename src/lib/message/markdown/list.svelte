<script lang="ts">
	import type { ASTNode } from './common';
	import Node from './node.svelte';

	export let node: { ordered: boolean; items: ASTNode[][]; start: number };
</script>

<svelte:element this={node.ordered ? 'ol' : 'ul'} start={node.start}>
	{#each node.items ?? [] as child}
		<li><Node node={child} /></li>
	{/each}
</svelte:element>

<style>
	ol,
	ul {
		margin: 4px 0 0 16px;
		list-style-position: outside;
		padding: 0px;
	}
	li{
		margin-bottom: 4px;
	}
</style>

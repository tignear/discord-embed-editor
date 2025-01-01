<script lang="ts">
	import Node from './node.svelte';
	import { renderer, type ASTNode, simpleRenderer, leafRenderer, nodeRenderer } from './common';
	interface Props {
		node: ASTNode | ASTNode[];
	}

	let { node }: Props = $props();
</script>

{#if Array.isArray(node)}
	{#each node as child}
		<Node node={child} />
	{/each}
{:else if node.type === 'text'}
	<span class="plain">{node.content}</span>
{:else if node.type === 'br'}
	<br />
{:else if leafRenderer[node.type] != null}
	{@const SvelteComponent = leafRenderer[node.type]}
	<SvelteComponent />
{:else if simpleRenderer[node.type] != null}
	{@const SvelteComponent_1 = simpleRenderer[node.type]}
	<SvelteComponent_1>
		{#if typeof node.content === 'string'}
			{node.content}
		{:else if node.content}
			<Node node={node.content} />
		{/if}
	</SvelteComponent_1>
{:else if nodeRenderer[node.type] != null}
	{@const SvelteComponent_2 = nodeRenderer[node.type]}
	<SvelteComponent_2 {node} />
{:else if renderer[node.type] != null}
	{@const SvelteComponent_3 = renderer[node.type]}
	<SvelteComponent_3 {node}>
		{#if typeof node.content === 'string'}
			{node.content}
		{:else}
			<Node node={node.content} />
		{/if}
	</SvelteComponent_3>
{:else}
	{JSON.stringify(node)}
{/if}

<style>
	.plain {
		white-space: break-spaces;
	}
</style>

<script lang="ts">
	import { renderer, type ASTNode, simpleRenderer, leafRenderer, nodeRenderer } from './common';
	export let node: ASTNode | ASTNode[];
</script>

{#if Array.isArray(node)}
	{#each node as child}
		<svelte:self node={child} />
	{/each}
{:else if node.type === 'text'}
	<span class="plain">{node.content}</span>
{:else if node.type === 'br'}
	<br />
{:else if leafRenderer[node.type] != null}
	<svelte:component this={leafRenderer[node.type]} />
{:else if simpleRenderer[node.type] != null}
	<svelte:component this={simpleRenderer[node.type]}>
		{#if typeof node.content === 'string'}
			{node.content}
		{:else if node.content}
			<svelte:self node={node.content} />
		{/if}
	</svelte:component>
{:else if nodeRenderer[node.type] != null}
	<svelte:component this={nodeRenderer[node.type]} {node} />
{:else if renderer[node.type] != null}
	<svelte:component this={renderer[node.type]} {node}>
		{#if typeof node.content === 'string'}
			{node.content}
		{:else}
			<svelte:self node={node.content} />
		{/if}
	</svelte:component>
{:else}
	{JSON.stringify(node)}
{/if}

<style>
	.plain {
		white-space: break-spaces;
	}
</style>

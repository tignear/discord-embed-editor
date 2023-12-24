<script lang="ts">
	import { renderer, type ASTNode } from './common';
	export let node: ASTNode | ASTNode[];
</script>

{#if Array.isArray(node)}
	{#each node as child}
		<svelte:self node={child} />
	{/each}
{:else if node.type === 'text'}
	<span class="plain">{node.content}</span>
{:else if node.type === 'br'}
	<br>
{:else if renderer[node.type] != null}
	<svelte:component this={renderer[node.type]} {node}>
		{#if typeof node.content === 'string'}
			{node.content}
		{:else if node.content}
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

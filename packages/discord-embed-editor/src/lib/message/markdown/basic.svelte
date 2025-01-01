<script module lang="ts">
	export const tag: Record<string, string> = {
		em: 'em',
		strong: 'strong',
		underline: 'u',
		strikethrough: 'del',
		inlineCode: 'code'
	};
</script>

<script lang="ts">
	import type { ASTNode } from './common';
	interface Props {
		node: ASTNode;
		children?: import('svelte').Snippet;
	}

	let { node, children }: Props = $props();
</script>

<svelte:element this={tag[node.type]}>{@render children?.()}</svelte:element>

<style>
	code {
		width: auto;
		height: auto;
		padding: 0.2em;
		margin: -0.2em 0;
		border-radius: 3px;
		font-size: 85%;
		text-indent: 0;
		border: none;
		white-space: pre-wrap;
		font-size: 0.875rem;
		line-height: 1.125rem;
    background-color: hsl(220 calc(1 * 6.5%) 18% / 1);
		border: 1px solid hsl(225 calc(1 * 6.3%) 12.5% / 1);
	}
</style>

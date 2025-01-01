<script lang="ts">
	import type { ASTNode } from './common';

	interface Props {
		node: ASTNode;
		children?: import('svelte').Snippet;
	}

	let { node, children }: Props = $props();
</script>

<svelte:element this={'h' + (node.level + 3)}>{@render children?.()}</svelte:element>

<style>
	h4:first-child,
	h5:first-child,
	h6:first-child {
		margin-top: 8px;
	}
	h4 {
		font-size: 1.5rem;
	}
	h5 {
		font-size: 1.25rem;
	}
	h6 {
		font-size: 1rem;
	}
	h4,
	h5,
	h6 {
		font-weight: 700;
		line-height: 1.375em;
		margin: 16px 0 8px;
	}
</style>

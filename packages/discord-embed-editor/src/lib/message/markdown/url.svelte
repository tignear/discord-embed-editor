<script lang="ts">
	import type { ASTNode } from './common';

	interface Props {
		node: { content: ASTNode[]; target: string };
		children?: import('svelte').Snippet;
	}

	let { node, children }: Props = $props();
</script>

<a href={node.target} rel="noreferrer noopener" target="_blank">{@render children?.()}</a>

<style>
	a {
		color: rgb(0, 168, 252);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
</style>

<script lang="ts">
	import type { ASTNode } from './common';

	export let node: { content: ASTNode[]; target: string };
</script>

<a href={node.target} rel="noreferrer noopener" target="_blank"><slot /></a>
<style>
	a{
		color: rgb(0, 168, 252);
		text-decoration: none;
	}
</style>
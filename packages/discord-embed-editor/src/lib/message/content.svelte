<script lang="ts">
	import Markdown from "./markdown/markdown.svelte";
	
	interface Props {
		content?: string;
	}

	let { content = '' }: Props = $props();
</script>

<div><Markdown {content}></Markdown></div>

<style>
</style>

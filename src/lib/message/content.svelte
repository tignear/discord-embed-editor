<script lang="ts">
	import Markdown from "./markdown/markdown.svelte";
	
	export let content: string = '';
</script>

<div><Markdown {content}></Markdown></div>

<style>
</style>

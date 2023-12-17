<script lang="ts">
	export let content: string = '';
</script>

<div><span class="content">{content}</span></div>

<style>
	.content {
		white-space: break-spaces;
		word-wrap: break-word;
	}
</style>

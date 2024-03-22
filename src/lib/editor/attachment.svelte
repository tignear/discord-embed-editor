<script lang="ts">
	import Button from '@smui/button';
	import Preview from './preview.svelte';

	export let files: File[] = [];
	let input: HTMLInputElement;
</script>

<div>
	<div class="preview">
		{#each files as file}
			<Preview {file}></Preview>
		{/each}
	</div>
	<Button tag="label" for="file_pick">選択</Button>
	<input
		bind:this={input}
		id="file_pick"
		type="file"
		style="opacity: 0;"
		multiple
		on:change={(ev) => {
			files = files.toSpliced(files.length, 0, ...(input.files ?? []));
			input.files = null;
		}}
	/>
</div>

<style>
	.preview {
		overflow-x: scroll;
		display: flex;
	}

</style>

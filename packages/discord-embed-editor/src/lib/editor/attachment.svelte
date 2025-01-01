<script lang="ts" module>
</script>

<script lang="ts">
	import Button from '@smui/button';
	import Preview from './preview.svelte';
	import type { DiscordFileData } from '$lib';

	interface Props {
		files?: DiscordFileData[];
	}

	let { files = $bindable([]) }: Props = $props();
	let input: HTMLInputElement = $state()!;
</script>

<div>
	<div class="preview">
		{#each files as file, idx}
			<Preview
				bind:file={file.file}
				bind:spoiler={file.spoiler}
				bind:description={file.description}
				on:delete={() => {
					files = files.toSpliced(idx, 1);
				}}
			></Preview>
		{/each}
	</div>
	<Button tag="label" for="file_pick">選択</Button>
	<input
		bind:this={input}
		id="file_pick"
		type="file"
		style="opacity: 0;"
		multiple
		onchange={() => {
			files = files.toSpliced(
				files.length,
				0,
				...[...(input.files ?? [])].map((f) => {
					return {
						file: f,
						description: '',
						spoiler: false
					};
				})
			);
			input.files = null;
		}}
	/>
</div>

<style>
	.preview {
		overflow-x: scroll;
		display: flex;
		justify-content: flex-start;
	}
</style>

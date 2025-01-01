<script lang="ts">
	import { blobAction } from '$lib/blob-action';
	interface Props {
		file: File;
		description: string;
	}

	let { file, description }: Props = $props();
</script>

<div>
	<img use:blobAction={file} alt={description} />
</div>

<style>
	img {
		width: auto;
		max-width: 8rem;
		height: fit-content;
		max-height: 8rem;
	}
</style>

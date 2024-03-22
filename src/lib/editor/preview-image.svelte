<script lang="ts">
	import { blobAction } from '$lib/blob-action';
	export let file: File;
	export let description: string;
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

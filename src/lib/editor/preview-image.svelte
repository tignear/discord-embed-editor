<script lang="ts">
	import { Image } from '@smui/image-list';
	import { onDestroy } from 'svelte';
	export let file: File | undefined = undefined;
	let url: string | undefined = undefined;
	$: {
		if (url != null) {
			URL.revokeObjectURL(url);
		}
		if (file != null) {
			url = URL.createObjectURL(file);
		}
	}
	onDestroy(() => {
		if (url != null) {
			URL.revokeObjectURL(url);
		}
	});
</script>

<div>
	<img src={url} alt="" />
</div>

<style>
	img {
		width: auto;
		max-width: 8rem;
		height: fit-content;
		max-height: 8rem;
	}
</style>

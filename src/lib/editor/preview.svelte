<script lang="ts">
	import { onDestroy } from 'svelte';
	export let file: File | undefined = undefined;
	let url: string | undefined = undefined;
	let name: string = '';
	$: {
		if (url != null) {
			URL.revokeObjectURL(url);
		}
		if (file != null) {
			url = URL.createObjectURL(file);
			name = file.name;
		}
	}
	onDestroy(() => {
		if (url != null) {
			URL.revokeObjectURL(url);
		}
	});
</script>

<div>
	<figure>
		<img src={url} alt="" />
		<figcaption>{name}</figcaption>
	</figure>
</div>

<style>
	img {
		width: auto;
		max-width: 16rem;
		height: fit-content;
		max-height: 9rem;
	}
</style>

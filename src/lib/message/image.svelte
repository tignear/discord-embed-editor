<script lang="ts">
	import { blobAction } from '$lib/blob-action';

	export let attachments: File[];
	export let src: string;
	let data: File | undefined;

	$: {
		const [scheme,filename] = src.split('://');
		if (scheme === 'attachment') {
			data = attachments.find((e) => e.name === filename);
		} else {
			data = undefined;
		}
	}
</script>

{#if data == null}
	<img class={$$props.class} {src} alt="" />
{:else}
	<img class={$$props.class} use:blobAction={data} alt="" />
{/if}

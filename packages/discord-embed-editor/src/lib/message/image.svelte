<script lang="ts">
	import { blobAction } from '$lib/blob-action';

	interface Props {
		attachments: File[];
		src: string;
		[key: string]: any;
	}

	let { ...props }: Props = $props();
	let data: File | undefined = $state();

	$effect.pre(() => {
		const [scheme, filename] = props.src.split('://');
		if (scheme === 'attachment') {
			data = props.attachments.find((e) => e.name === filename);
		} else {
			data = undefined;
		}
	});
</script>

{#if data == null}
	<img class={props.class} src={props.src} alt="" />
{:else}
	<img class={props.class} use:blobAction={data} alt="" />
{/if}

<script lang="ts">
	import { CDN } from '@discordjs/rest';
	interface Props {
		node: { animated: boolean; id: string; name: string };
	}

	let { node }: Props = $props();
	let url = $derived(new CDN().emoji(node.id, {
		extension: node.animated ? 'gif' : 'webp',
		size: 64
	}));
</script>

<img src={url} alt={node.name} />

<style>
	img {
		object-fit: contain;
		width: 1.375em;
		height: 1.375em;
		vertical-align: bottom;
	}
</style>

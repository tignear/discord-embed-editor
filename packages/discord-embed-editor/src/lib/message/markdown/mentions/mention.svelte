<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<span>{@render children?.()}</span>

<style>
	span {
		filter: saturate(1);
		border-radius: 3px;
		padding: 0 2px;
		font-weight: 500;
		unicode-bidi: plaintext;
		color: rgb(201, 205, 251);
		background: hsl(235 calc(1 * 85.6%) 64.7% / 0.3);
	}
</style>

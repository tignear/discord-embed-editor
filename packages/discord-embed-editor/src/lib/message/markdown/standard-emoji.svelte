<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
	import { afterUpdate } from 'svelte';
  // @ts-ignore
	import twemoji, { type TwemojiOptions } from 'twemoji';
	export let node: { name: string };
	const options = {
		folder: 'svg',
		ext: '.svg',
    className: 'twemoji-rZi0mOkO7RXAKLd'
	} satisfies TwemojiOptions;
	let element: HTMLElement;
	afterUpdate(() => {
		twemoji.parse(element, options);
	});
</script>

<span bind:this={element}>{node.name}</span>

<style>
	:global(.twemoji-rZi0mOkO7RXAKLd) {
		display: inline;
		width: 1.375em;
		height: 1.375em;
		vertical-align: bottom;
		object-fit: contain;
	}
</style>

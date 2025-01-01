<script lang="ts">
	import { onMount } from 'svelte';
  import { moment } from "./timestamp.svelte";

	interface Props {
		locales?: string[];
		timestamp: number;
	}

	let { locales = ['en-GB'], timestamp }: Props = $props();
	function getFormattedString() {
		return moment.unix(timestamp).locale(locales).fromNow();
	}
	let formattedString = $state(getFormattedString());
	onMount(() => {
		const cancelToken = setInterval(() => {
			formattedString = getFormattedString();
		}, 1000);
		return () => {
			clearInterval(cancelToken);
		};
	});
</script>

<span>{formattedString}</span>

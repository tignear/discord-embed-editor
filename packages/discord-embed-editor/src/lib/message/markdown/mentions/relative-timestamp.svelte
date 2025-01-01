<script lang="ts">
	import { onMount } from 'svelte';
  import { moment } from "./timestamp.svelte";

	export let locales: string[] = ['en-GB'];
	export let timestamp: number;
	function getFormattedString() {
		return moment.unix(timestamp).locale(locales).fromNow();
	}
	let formattedString = getFormattedString();
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

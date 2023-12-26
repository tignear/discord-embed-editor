<script lang="ts" context="module">
	// @ts-ignore
	import _moment from 'moment/min/moment-with-locales';
	import type momentDefault from 'moment';
	_moment.relativeTimeThreshold('ss', 0);
	export const moment = _moment as typeof momentDefault;
</script>

<script lang="ts">
	import AbsoluteTimestamp from './absolute-timestamp.svelte';
	import type { Format } from './absolute-timestamp.svelte';
	import RelativeTimestamp from './relative-timestamp.svelte';
	export let locales: string[] = ['en-GB'];
	export let node: { format?: Format | 'R'; timestamp: string };
	$: timestamp = Number.parseInt(node.timestamp);
</script>

{#if node.format === 'R'}
	<RelativeTimestamp {locales} {timestamp}></RelativeTimestamp>
{:else}
	<AbsoluteTimestamp format={node.format ?? 'f'} {locales} {timestamp}></AbsoluteTimestamp>
{/if}

<script lang="ts" context="module">
	export type Format = 't' | 'T' | 'd' | 'D' | 'f' | 'F';
</script>

<script lang="ts">
	import { moment } from './timestamp.svelte';

	export let locales: string[] = ['en-GB'];
	export let format: Format;
	export let timestamp: number;

	function getFormatOption(format: Format = 'f') {
		switch (format) {
			case 't':
				return 'HH:mm';
			case 'T':
				return 'HH:mm:ss';
			case 'd':
				return 'L';
			case 'D':
				return 'LL';
			case 'f':
				return 'L HH:mm';
			case 'F':
				return 'LL HH:mm';
		}
	}
</script>

<span>{moment.unix(timestamp).locale(locales).format(getFormatOption(format))}</span>

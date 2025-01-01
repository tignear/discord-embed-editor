<script lang="ts" module>
	export type Format = 't' | 'T' | 'd' | 'D' | 'f' | 'F';
</script>

<script lang="ts">
	import { moment } from './timestamp.svelte';

	interface Props {
		locales?: string[];
		format: Format;
		timestamp: number;
	}

	let { locales = ['en-GB'], format, timestamp }: Props = $props();

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

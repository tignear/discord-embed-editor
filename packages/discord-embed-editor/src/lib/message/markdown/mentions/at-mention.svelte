<script lang="ts">
	import Mention from "./mention.svelte";
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>
<Mention>@{text}</Mention>
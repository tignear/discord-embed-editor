<script lang="ts">
	import Mention from "./mention.svelte";
	export let text: string;
</script>
<Mention>@{text}</Mention>
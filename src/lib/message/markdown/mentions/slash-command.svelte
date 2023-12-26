<script lang="ts">
	import Mention from './mention.svelte';
	export let node: { name: string; subcommandGroup?: string; subcommand?: string };
</script>

<Mention
	>/{node.name}
	{#if node.subcommandGroup != undefined}
		{' ' + node.subcommandGroup}
	{/if}
	{#if node.subcommand != undefined}
		{' ' + node.subcommand}
	{/if}
</Mention>

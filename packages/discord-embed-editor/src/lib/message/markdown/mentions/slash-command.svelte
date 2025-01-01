<script lang="ts">
	import Mention from './mention.svelte';
	interface Props {
		node: { name: string; subcommandGroup?: string; subcommand?: string };
	}

	let { node }: Props = $props();
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

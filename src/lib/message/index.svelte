<script lang="ts">
	import Avatar from './avatar.svelte';
	import Header from './header.svelte';
	import Content from './content.svelte';
	import Embed from './embed.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';

	export let content: string = '';
	export let icon: string | undefined = undefined;
	export let timestamp: string;
	export let username: string;
	export let embeds: APIEmbed[] = [];
</script>

<div class="message">
	<Header {timestamp} {username}></Header>
	<Avatar src={icon} />
	<Content {content}></Content>

	<div>
		{#each embeds as embed}
			<Embed data={embed}></Embed>
		{/each}
	</div>
</div>

<style>
	.message {
		background-color: hsl(223 calc(1 * 6.7%) 20.6% / 1);
		color: rgb(219, 222, 225);
		padding-left: 72px;
		padding-right: 48px;
		position: relative;
		min-height: 2.75rem;
		font-family: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
</style>

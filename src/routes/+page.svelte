<script lang="ts">
	import Message from '$lib/message/index.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';
	let content = 'aaaa';
	let timestamp = 'Today at 08:42';
	let username = 'tig';
	let embeds: APIEmbed[] = [
		{
			title: 'にゃーん',
			color: 0x000000,
			description: 'this is embed description',
			author: {
				name: 'tig',
				icon_url:
					'https://lh3.googleusercontent.com/a-/AOh14GgdSSCo3ooeyyoaIvFBPykXmIVyprXdJ7IImAUi#.png'
			},
			fields: [
				{
					name: 'aaaaaa',
					value: 'bbbbb',
					inline: true
				},
				{
					name: 'aaaaaa',
					value: 'bbbbb',
					inline: true
				}
			]
		}
	];
</script>

<Message {username} {content} {timestamp} {embeds}></Message>

<script lang="ts">
	import Message from '$lib/message/index.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';
	let content = 'aaaa';
	let timestamp = 'Today at 08:42';
	let username = 'tig';
	let embeds: APIEmbed[] = [
		{
			title: 'にゃーん',
			color: 0xffffff,
			description: 'this is embed description',
			timestamp: '01/12/2023 00:00',
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
			],
			footer: {
				icon_url:
					'https://lh3.googleusercontent.com/a-/AOh14GgdSSCo3ooeyyoaIvFBPykXmIVyprXdJ7IImAUi#.png',
				text: 'aaa'
			}
		},{
			color: 0x0000ff,
			description: "embed2"
		}
	];
</script>

<Message {username} {content} {timestamp} {embeds}></Message>

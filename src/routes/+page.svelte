<script lang="ts">
	import Editor from '$lib/editor.svelte';
	import Message from '$lib/message/message.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';
	import moment from 'moment';
	let content = `# Big Header
## Smaller Header
### Even Smaller Header
line1
 line2
*italic1* _italic2_ **bold** ***bold_italic*** __underline__ ~~strike~~
[This is Google](https://google.com/)
- List of stuff
- and things
* and more things

* this is another list
 * of stuff
 - and things
\`Wow look at this one line code block!\`
\`\`\`ts
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             \` class="\${cls}"\`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}
\`\`\`
> Pink Lemonade
Raspberry Lemonade
Strawberry Lemonade
## mentions
everyone: @everyone
here: @here
user: <@408939071289688064>
user(!): <@!408939071289688064>
role: <@&708713933829046293>
channel: <#494780225280802819> 
slash command: </airhorn:816437322781949972>
slash command: </airhorn subcommand:816437322781949972>
slash command: </airhorn group subcommand:816437322781949972>
standard emoji: 💯
custom emoji: <:mmLol:216154654256398347>
custom emoji(animated): <a:b1nzy:392938283556143104>
unix timestamp: <t:1618953630>
unix timestamp(t): <t:1618953630:t>
unix timestamp(T): <t:1618953630:T>
unix timestamp(d): <t:1618953630:d>
unix timestamp(D): <t:1618953630:D>
unix timestamp(f): <t:1618953630:f>
unix timestamp(F): <t:1618953630:F>
unix timestamp(R): <t:1703605838:R>

autolink: https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-`;
	let timestamp = 'Today at 08:42';
	let username = 'tig';
	let embeds: APIEmbed[] = [
		{
			title: 'にゃーん',
			color: 0xffffff,
			description:
				'this is embed description\n*italic1* _italic2_ **bold** ***bold_italic*** __underline__ ~~strike~~',
			timestamp: undefined,
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
				},
				{
					name: 'aaaaaa',
					value: 'bbbbb',
					inline: true
				},
				{
					name: 'aaaaaa',
					value: 'bbbbb',
					inline: true
				},
				{
					name: 'aaaaaa',
					value: 'bbbbb',
					inline: true
				},
				{
					name: 'aaaaaa1',
					value: 'bbbbb',
					inline: false
				}
			],
			footer: {
				icon_url:
					'https://lh3.googleusercontent.com/a-/AOh14GgdSSCo3ooeyyoaIvFBPykXmIVyprXdJ7IImAUi#.png',
				text: 'aaa'
			},
			image: {
				url: 'https://media.discordapp.net/attachments/494780225280802819/1185953833835298847/image.png?ex=65917c93&is=657f0793&hm=7b4cfd57db6f74cd917f6a156fbb172c93ab0652fcf93671fe8062fe04964e0b&=&format=webp&quality=lossless&width=1440&height=17'
			},
			thumbnail: {
				url: 'https://lh3.googleusercontent.com/a-/AOh14GgdSSCo3ooeyyoaIvFBPykXmIVyprXdJ7IImAUi#.png'
			}
		},
		{
			color: 0x0000ff,
			description: 'embed2'
		}
	];
</script>

<div style="display: flex;margin: 0">
	<div class="embed-editor">
		<h2>Editor</h2>
		<Editor bind:content bind:embeds></Editor>
	</div>
	<div style="flex: 1;padding: 0; margin: 0;height: 100svh;overflow-y: auto;">
		<Message {username} {content} {timestamp} {embeds}></Message>
	</div>
</div>
<style>
	.embed-editor{
		flex: 1;
		height: 100svh;
		padding: 0 8px;
		overflow-y: auto;
	}
</style>
<script lang="ts">
	import Message from '$lib/message/message.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';
	let content = 
`# Big Header
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

autolink: https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-`;
	let timestamp = 'Today at 08:42';
	let username = 'tig';
	let embeds: APIEmbed[] = [
		{
			title: 'にゃーん',
			color: 0xffffff,
			description: 'this is embed description\n*italic1* _italic2_ **bold** ***bold_italic*** __underline__ ~~strike~~',
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

<Message {username} {content} {timestamp} {embeds}></Message>

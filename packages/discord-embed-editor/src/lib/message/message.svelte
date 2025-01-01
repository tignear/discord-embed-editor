<script lang="ts">
	import Avatar from './avatar.svelte';
	import Header from './header.svelte';
	import Content from './content.svelte';
	import Embed from './embed.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';
	import { blobAction } from '$lib/blob-action';
	import { IMAGE_MIME_TYPES } from '$lib';
	export let content: string = '';
	export let icon: string = '';
	export let timestamp: string;
	export let username: string | undefined;
	export let embeds: APIEmbed[] = [];
	export let attachments: File[] = [];
	function computeUsedFiles(embeds: APIEmbed[]): string[] {
		const urls = embeds.flatMap((embed) => {
			return [
				embed.author?.icon_url,
				embed.thumbnail?.url,
				embed.image?.url,
				embed.footer?.icon_url
			].filter((e): e is string => e != null);
		});
		return urls.flatMap((url) => {
			const [scheme, filename] = url.split('://');
			if (scheme === 'attachment' && filename != null) {
				return [filename];
			} else {
				return [];
			}
		});
	}
	function computePreviewAttachments(attachments: File[], embeds: APIEmbed[]): File[] {
		const usedFiles = computeUsedFiles(embeds);
		return attachments.filter((e) => !usedFiles.includes(e.name));
	}
	$: previewAttachments = computePreviewAttachments(attachments, embeds);
</script>

<div class="message">
	<Header {timestamp} {username}></Header>
	<Avatar src={icon} />
	<Content {content}></Content>
	<div class="message-accessories">
		<div class="attachment-preview-container">
			{#each previewAttachments as attachment}
				{#if IMAGE_MIME_TYPES.includes(attachment.type)}
					<img class="attachment-preview" use:blobAction={attachment} alt="" />
				{/if}
				<!--TODO: preview other file formats-->
			{/each}
		</div>

		{#each embeds as embed}
			<Embed data={embed} {attachments}></Embed>
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
	.message-accessories {
		display: grid;
		height: fit-content;
		grid-auto-flow: row;
		grid-row-gap: 0.25rem;
		grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
		text-indent: 0;
		min-height: 0;
		min-width: 0;
		padding-top: 0.125rem;
		padding-bottom: 0.125rem;
	}
	.attachment-preview-container {
		display: flex;
	}
	img.attachment-preview {
		display: block;
		max-width: 32rem;
		max-height: 18rem;
		width: auto;
		height: auto;
	}
</style>

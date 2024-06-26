<script lang="ts">
	import EmbedFields from './embed-fields.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';
	import Markdown from './markdown/markdown.svelte';
	import moment from 'moment';
	import Image from './image.svelte';
	export let data: APIEmbed;
	export let attachments: File[] = [];
	$: author = data.author;
	function timestamp(timestamp: string | undefined) {
		return timestamp != null && timestamp != '' ? moment(timestamp).format('L HH:mm') : '';
	}
</script>

<div class="container">
	<article
		class="embed-wrapper"
		style:border-color={'#' + (data.color?.toString(16).padStart(6, '0') ?? '000000')}
	>
		<div class="grid-container">
			<div class="grid" class:thumbnail={data.thumbnail != null}>
				{#if author != null}
					<div class="embed-author">
						{#if author.icon_url != null && author.icon_url != ''}
							<Image class="embed-author-icon" src={author.icon_url} {attachments} />
						{/if}
						{#if author.name != ''}
							{#if author.url != null && author.url != ''}
								<a
									href={author.url}
									class="embed-author-link"
									rel="noreferrer noopener"
									target="_blank"
								>
									<span class="embed-author-name">{author.name}</span>
								</a>
							{:else}
								<span class="embed-author-name">{author.name}</span>
							{/if}
						{/if}
					</div>
				{/if}
				{#if data.title != null && data.title != ''}
					<div class="embed-title embed-margin">
						{#if data.url != null && data.url != ''}
							<a href={data.url} class="embed-url" rel="noreferrer noopener" target="_blank">
								{data.title}
							</a>
						{:else}
							{data.title}
						{/if}
					</div>
				{/if}
				{#if data.description != null && data.description != ''}
					<div class="embed-description embed-margin">
						<Markdown content={data.description}></Markdown>
					</div>
				{/if}
				<EmbedFields fields={data.fields ?? []}></EmbedFields>
				{#if data.thumbnail != null}
					<div class="embed-thumbnail-wrapper">
						<Image class="embed-thumbnail" src={data.thumbnail.url} {attachments} />
					</div>
				{/if}
				{#if data.image?.url != null && data.image.url != ''}
					<div class="embed-image-wrapper">
						<Image class="embed-image" src={data.image.url} {attachments} />
					</div>
				{/if}
				{#if data.footer != null || data.timestamp != null}
					<div class="embed-footer embed-margin">
						{#if data.footer?.icon_url != null && data.footer.icon_url != ''}
							<Image class="embed-footer-icon" src={data.footer.icon_url} {attachments} />
						{/if}
						<span class="embed-footer-text">
							{data.footer?.text ?? ''}
							{#if data.timestamp != null && data.timestamp != '' && data.footer != null}
								<span class="embed-footer-separator">•</span>
							{/if}
							{timestamp(data.timestamp)}
						</span>
					</div>
				{/if}
			</div>
		</div>
	</article>
</div>

<style>
	.embed-wrapper {
		border-left: 4px solid;
		position: relative;
		display: grid;
		max-width: max-content;
		box-sizing: border-box;
		border-radius: 4px;
		background-color: hsl(220 calc(1 * 6.5%) 18% / 1);
	}
	.grid.thumbnail {
		grid-template-columns: auto min-content;
	}
	.embed-title {
		font-size: 1rem;
		font-weight: 600;
		display: inline-block;
		grid-column: 1/1;
	}
	.embed-description {
		font-size: 0.875rem;
		line-height: 1.125rem;
		font-weight: 400;
		white-space: pre-line;
		grid-column: 1/1;
	}
	.embed-margin {
		margin-top: 8px;
	}
	.embed-author {
		display: flex;
		justify-content: left;
	}
	.embed-url {
		text-decoration: inherit;
	}
	.embed-url:hover {
		text-decoration: underline;
	}
	.embed-author-link {
		color: inherit;
		text-decoration: inherit;
	}
	.embed-author-link:hover {
		text-decoration: underline;
	}
	div :global(.embed-author-icon) {
		margin-right: 8px;
		width: 24px;
		height: 24px;
		object-fit: contain;
		border-radius: 50%;
	}
	.embed-author-name {
		font-size: 0.875rem;
		font-weight: 600;
	}
	.embed-footer {
		display: flex;
		grid-auto-flow: column;
		justify-content: left;
		align-items: center;
		grid-column: 1;
	}
	div :global(.embed-footer-icon) {
		margin-right: 8px;
		width: 20px;
		height: 20px;
		object-fit: contain;
		border-radius: 50%;
	}
	.embed-footer-text {
		color: rgb(219, 222, 225);
		font-size: 0.75rem;
		line-height: 1rem;
		font-weight: 500;
	}
	.embed-footer-separator {
		font-weight: 500;
		margin: 0 4px;
	}
	.embed-thumbnail-wrapper {
		display: flex;
		flex-flow: column nowrap;
		justify-self: end;
		grid-row: 1/8;
		grid-column: 2/2;
		margin-left: 16px;
		margin-top: 8px;
		object-fit: fill;
		max-width: 80px;
		max-height: 80px;
	}
	div:global(.embed-thumbnail) {
		border-radius: 3px;
	}
	.grid-container {
		max-width: 516px;
		line-height: 1.375rem;
		word-wrap: break-word;
	}
	.embed-image-wrapper {
		display: flex;
		flex-flow: column nowrap;
		justify-self: end;
		margin-top: 16px;
		grid-column: 1/3;
	}
	div :global(.embed-image) {
		max-width: 100%;
		max-height: 300px;
	}
	.grid {
		overflow: hidden;
		padding: 0.5rem 1rem 1rem 0.75rem;
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
	}
</style>

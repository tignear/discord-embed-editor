<script lang="ts">
	import EmbedFields from './embed-fields.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';
	export let data: APIEmbed;
	$: author = data.author;
</script>

<div class="container">
	<article
		class="embed-wrapper"
		style:border-color={'#' + data.color?.toString(16).padStart(6, '0') ?? '000000'}
	>
		<div class="grid-container">
			<div class="grid">
				{#if author != null}
					<div class="embed-author">
						{#if author.icon_url != null}
							<img class="embed-author-icon" src={author.icon_url} alt="" />
						{/if}
						{#if author.name != null}
							<span class="embed-author-name">{author.name}</span>
						{/if}
					</div>
				{/if}
				{#if data.title != null}
					<div class="embed-title embed-margin">
						{data.title}
					</div>
				{/if}
				{#if data.description != null}
					<div class="embed-description embed-margin">
						{data.description}
					</div>
				{/if}
				<EmbedFields fields={data.fields ?? []}></EmbedFields>
				{#if data.image != null}
					<div class="embed-image-wrapper">
						<img class="embed-image" alt="" src={data.image.url} />
					</div>
				{/if}
				{#if data.footer != null || data.timestamp != null}
					<div class="embed-footer embed-margin">
						{#if data.footer?.icon_url != null}
							<img class="embed-footer-icon" src={data.footer.icon_url} alt="" />
						{/if}
						<span class="embed-footer-text">
							{data.footer?.text ?? ''}
							{#if data.timestamp != null && data.footer != null}
								<span class="embed-footer-separator">•</span>
							{/if}
							{data.timestamp ?? ''}
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
		display: grid;
		grid-auto-flow: column;
		justify-content: left;
	}
	.embed-author-icon {
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
	}
	.embed-footer-icon {
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
	.grid-container {
		max-width: 516px;
		line-height: 1.375rem;
		word-wrap: break-word;
	}
	.embed-image {
		max-width: 400px;
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

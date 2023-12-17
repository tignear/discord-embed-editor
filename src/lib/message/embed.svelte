<script lang="ts">
	import type { APIEmbed, APIEmbedField } from 'discord-api-types/v10';
	export let data: APIEmbed;
	interface FieldData {
		name: string;
		value: string;
		inlineClass: 'embed-field-full' | 'embed-field-inline-left' | 'embed-field-inline-right';
	}
	function processInlineFields(fields: APIEmbedField[]): FieldData[] {
		const result: FieldData[] = [];
		let isInInlineContext: APIEmbedField | null = null;
		for (const field of fields) {
			const inline = field.inline ?? false;
			if (isInInlineContext != null && inline) {
				//inline
				result.push(
					{
						name: isInInlineContext.name,
						value: isInInlineContext.value,
						inlineClass: 'embed-field-inline-left'
					},
					{
						name: field.name,
						value: field.value,
						inlineClass: 'embed-field-inline-right'
					}
				);
				isInInlineContext = null;
			} else if (inline) {
				isInInlineContext = field;
				continue;
			} else {
				if (isInInlineContext) {
					result.push({
						name: isInInlineContext.name,
						value: isInInlineContext.value,
						inlineClass: 'embed-field-full'
					});
					isInInlineContext = null;
				}
				result.push({
					name: field.name,
					value: field.value,
					inlineClass: 'embed-field-full'
				});
			}
		}
		if (isInInlineContext) {
			result.push({
				name: isInInlineContext.name,
				value: isInInlineContext.value,
				inlineClass: 'embed-field-full'
			});
		}
		return result;
	}
	$: fields = processInlineFields(data.fields ?? []);
</script>

<div class="container">
	<article class="embed-wrapper" style:border-color={'#' + data.color?.toString(16)}>
		<div class="grid-container">
			<div class="grid">
				{#if data.title}
					<div class="embed-title embed-margin">
						{data.title}
					</div>
				{/if}
				{#if data.description}
					<div class="embed-description embed-margin">
						{data.description}
					</div>
				{/if}
				{#if fields.length !== 0}
					<div class="embed-fields">
						{#each fields as field}
							<div
								class="embed-field"
								class:embed-field-full={field.inlineClass === 'embed-field-full'}
								class:embed-field-inline-left={field.inlineClass === 'embed-field-inline-left'}
								class:embed-field-inline-right={field.inlineClass === 'embed-field-inline-right'}
							>
								<div class="embed-field-name">{field.name}</div>
								<div class="embed-field-value">{field.value}</div>
							</div>
						{/each}
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
	.embed-fields {
		display: grid;
		grid-column: 1/1;
		margin-top: 8px;
		grid-gap: 8px;
		min-width: 0;
	}
	.embed-field {
		font-size: 0.875rem;
		line-height: 1.125rem;
		font-weight: 400;
		min-width: 0;
	}
	.embed-field-full {
		grid-column: 1/3;
	}
	.embed-field-inline-left {
		grid-column: 1/2;
	}
	.embed-field-inline-right {
		grid-column: 2/3;
	}
	.embed-field-name {
		font-size: 0.875rem;
		line-height: 1.125rem;
		font-weight: 600;
		margin-bottom: 2px;
		min-width: 0;
	}
	.embed-field-value {
		font-size: 0.875rem;
		line-height: 1.125rem;
		font-weight: 400;
		white-space: pre-line;
		min-width: 0;
	}
	.embed-margin {
		margin-top: 8px;
	}
	.grid-container {
		max-width: 516px;
		line-height: 1.375rem;
		word-wrap: break-word;
	}
	.grid {
		overflow: hidden;
		padding: 0.5rem 1rem 1rem 0.75rem;
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
	}
</style>

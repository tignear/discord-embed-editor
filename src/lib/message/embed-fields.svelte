<script lang="ts">
	import type { APIEmbedField } from 'discord-api-types/v10';
	import EmbedField, { type FieldData } from './embed-field.svelte';
	export let fields: APIEmbedField[];
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

	$: _fields = processInlineFields(fields);
</script>

{#if _fields.length !== 0}
	<div class="embed-fields">
		{#each _fields as field}
			<EmbedField {...field}></EmbedField>
		{/each}
	</div>
{/if}

<style>
	.embed-fields {
		display: grid;
		grid-column: 1/1;
		margin-top: 8px;
		grid-gap: 8px;
		min-width: 0;
	}
</style>

<script lang="ts">
	import type { APIEmbedField } from 'discord-api-types/v10';
	import EmbedField, { type FieldData } from './embed-field.svelte';
	export let fields: APIEmbedField[];
	function processInlineFields(fields: APIEmbedField[]): FieldData[] {
		const result: FieldData[] = [];
		let columns: APIEmbedField[] = [];
		function pushColumns() {
			let idx = 0;
			for (const { name, value } of columns) {
				result.push({
					name,
					value,
					columnStart: 1 + (12 / columns.length) * idx,
					columnEnd: 1 + (12 / columns.length) * (idx + 1)
				});
				idx++;
			}
			columns = [];
		}
		for (const field of fields) {
			const inline = field.inline ?? false;
			if (!inline) {
				pushColumns();
				columns = [field];
				pushColumns();
				continue;
			}
			columns.push(field);
			if (columns.length === 3) {
				pushColumns();
			}
		}
		pushColumns();
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

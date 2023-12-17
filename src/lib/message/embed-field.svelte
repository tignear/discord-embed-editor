<script context="module" lang="ts">
	export interface FieldData {
		name: string;
		value: string;
		inlineClass: 'embed-field-full' | 'embed-field-inline-left' | 'embed-field-inline-right';
	}
</script>

<script lang="ts">
	export let inlineClass: FieldData['inlineClass'];
	export let name: FieldData['name'];
	export let value: FieldData['value'];
</script>

<div
	class="embed-field"
	class:embed-field-full={inlineClass === 'embed-field-full'}
	class:embed-field-inline-left={inlineClass === 'embed-field-inline-left'}
	class:embed-field-inline-right={inlineClass === 'embed-field-inline-right'}
>
	<div class="embed-field-name">{name}</div>
	<div class="embed-field-value">{value}</div>
</div>

<style>
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
</style>

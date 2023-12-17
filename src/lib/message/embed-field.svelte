<script context="module" lang="ts">
	export interface FieldData {
		name: string;
		value: string;
		columnStart: number;
		columnEnd: number;
	}
</script>

<script lang="ts">
	export let name: FieldData['name'];
	export let value: FieldData['value'];
	export let columnStart: number;
	export let columnEnd: number;
</script>

<div class="embed-field" style:grid-column="{columnStart.toString()}/{columnEnd.toString()}">
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

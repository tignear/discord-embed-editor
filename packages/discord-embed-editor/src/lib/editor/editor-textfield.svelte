<script lang="ts">
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	export let label: string;
	export let value: string | undefined;
	export let maxLength: number | undefined = undefined;
	export let textarea: boolean = false;
	export let ty: string = 'text';
</script>

<div class="editor-textfield-wrapper">
	{#if maxLength == null}
		<Textfield {textarea} bind:value {label} class="editor-textfield" type={ty} input$emptyValueUndefined></Textfield>
	{:else}
		<Textfield
			{textarea}
			bind:value
			{label}
			class="editor-textfield"
			input$maxlength={maxLength}
			input$emptyValueUndefined
			type={ty}
		>
			<CharacterCounter slot="helper">0 / {maxLength}</CharacterCounter>
		</Textfield>
	{/if}
</div>

<style>
	div :global(.editor-textfield) {
		width: 100%;
	}
	.editor-textfield-wrapper {
		width: 100%;
		margin: 2px;
	}
</style>

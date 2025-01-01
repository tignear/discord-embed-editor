<script lang="ts">
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	interface Props {
		label: string;
		value: string | undefined;
		maxLength?: number | undefined;
		textarea?: boolean;
		ty?: string;
	}

	let {
		label,
		value = $bindable(),
		maxLength = undefined,
		textarea = false,
		ty = 'text'
	}: Props = $props();
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
			{#snippet helper()}
						<CharacterCounter >0 / {maxLength}</CharacterCounter>
					{/snippet}
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

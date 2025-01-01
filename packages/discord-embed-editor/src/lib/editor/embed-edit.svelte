<script lang="ts">
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import FieldList from './field-list.svelte';
	import EmbedAuthor from './embed-author.svelte';
	import EditorTextfield from './editor-textfield.svelte';
	import type { EditorAPIEmbed } from '$lib';
	import ColorPicker from 'svelte-awesome-color-picker';
	export let embed: EditorAPIEmbed;
	$: rgb =
		embed.color != null
			? { r: embed.color >> 16, g: (embed.color >> 8) & 0xff, b: embed.color & 0xff, a: 0xff }
			: undefined;
</script>

<div>
	<EmbedAuthor bind:author={embed.author}></EmbedAuthor>
	<EditorTextfield bind:value={embed.title} label="Title" maxLength={80}></EditorTextfield>
	<EditorTextfield bind:value={embed.url} label="URL"></EditorTextfield>
	<EditorTextfield bind:value={embed.thumbnail.url} label="Thumbnail URL"></EditorTextfield>
	<EditorTextfield bind:value={embed.image.url} label="Image URL"></EditorTextfield>
	<div style="width: 100%;">
		<Textfield
			textarea
			bind:value={embed.description}
			label="Description"
			input$rows={8}
			input$maxlength={4000}
			style="width: 100%;margin-top: 8px;"
		>
			<CharacterCounter slot="internalCounter">0 / 4000</CharacterCounter>
		</Textfield>
	</div>
	<EditorTextfield bind:value={embed.footer.text} label="Footer" maxLength={2048}></EditorTextfield>
	<EditorTextfield bind:value={embed.footer.icon_url} label="Footer Icon URL"></EditorTextfield>
	<EditorTextfield bind:value={embed.timestamp} label="Timestamp" ty="datetime-local"
	></EditorTextfield>
	<div>
		<ColorPicker
			{rgb}
			nullable
			isAlpha={false}
			label="Embed Color"
			on:input={(ev) => {
				const color = ev.detail.rgb;
				if (color != null) {
					const { r, g, b } = color;
					embed = { ...embed, color: (r << 16) | (g << 8) | b };
				} else {
					embed = { ...embed, color };
				}
			}}
			texts={{
				label: {
					withoutColor: '色を指定しない'
				}
			}}>Embed Color</ColorPicker
		>
	</div>

	<FieldList bind:fields={embed.fields}></FieldList>
</div>

<style>
	:global(*) {
		--cp-bg-color: #333;
		--cp-border-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	}
</style>

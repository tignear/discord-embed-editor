<script lang="ts">
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import FieldList from './field-list.svelte';
	import EmbedAuthor from './embed-author.svelte';
	import EditorTextfield from './editor-textfield.svelte';
	import type { EditorAPIEmbed } from '$lib';
	export let embed: EditorAPIEmbed;
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
	<FieldList bind:fields={embed.fields}></FieldList>
</div>

<script lang="ts">
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import type { APIEmbed } from 'discord-api-types/v10';
	import FieldList from './field-list.svelte';
	import EmbedAuthor from './embed-author.svelte';
	import EditorTextfield from './editor-textfield.svelte';
	import moment from 'moment';
	export let embed: APIEmbed;
	let image: string = embed.image?.url ?? '';
	let thumbnail: string = embed.thumbnail?.url ?? '';
	let footer_text = embed.footer?.text ?? '';
	let footer_icon_url = embed.footer?.icon_url ?? '';
	let timestamp = embed.timestamp ?? '';
	embed.url ??= '';
	$: {
		embed.image = { url: image };
		embed.thumbnail = { url: thumbnail };
		embed.footer = { text: footer_text, icon_url: footer_icon_url };
		embed.timestamp = timestamp != '' ? moment(timestamp).utc().toISOString() : '';
	}
</script>

<div>
	<EmbedAuthor bind:author={embed.author}></EmbedAuthor>
	<EditorTextfield bind:value={embed.title} label="Title" maxLength={80}></EditorTextfield>
	<EditorTextfield bind:value={embed.url} label="URL"></EditorTextfield>
	<EditorTextfield bind:value={thumbnail} label="Thumbnail URL"></EditorTextfield>
	<EditorTextfield bind:value={image} label="Image URL"></EditorTextfield>
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
	<EditorTextfield bind:value={footer_text} label="Footer" maxLength={2048}></EditorTextfield>
	<EditorTextfield bind:value={footer_icon_url} label="Footer Icon URL"></EditorTextfield>
	<EditorTextfield bind:value={timestamp} label="Timestamp" ty="datetime-local"></EditorTextfield>
	<FieldList bind:fields={embed.fields}></FieldList>
</div>

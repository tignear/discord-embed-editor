<script lang="ts">
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import type { APIEmbedAuthor } from 'discord-api-types/v10';
	import EditorTextfield from './editor-textfield.svelte';
	export let author: APIEmbedAuthor | undefined = undefined;

	let author_name: string = author?.name ?? '';
	let author_url: string = author?.url ?? '';
	let author_icon_url: string = author?.icon_url ?? '';
	$: {
		author = {
			name: author_name,
			url: author_url,
			icon_url: author_icon_url
		};
	}
</script>

<div>
	<EditorTextfield bind:value={author_name} label="Author Name" maxLength={256}></EditorTextfield>
	<EditorTextfield bind:value={author_url} label="Author URL"></EditorTextfield>
	<EditorTextfield bind:value={author_icon_url} label="Author Icon URL"></EditorTextfield>
</div>

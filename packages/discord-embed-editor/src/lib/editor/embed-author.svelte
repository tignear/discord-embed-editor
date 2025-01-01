<script lang="ts">
	import { run } from 'svelte/legacy';

	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import type { APIEmbedAuthor } from 'discord-api-types/v10';
	import EditorTextfield from './editor-textfield.svelte';
	interface Props {
		author?: APIEmbedAuthor | undefined;
	}

	let { author = $bindable(undefined) }: Props = $props();

	let author_name: string = $state(author?.name ?? '');
	let author_url: string = $state(author?.url ?? '');
	let author_icon_url: string = $state(author?.icon_url ?? '');
	run(() => {
		author = {
			name: author_name,
			url: author_url,
			icon_url: author_icon_url
		};
	});
</script>

<div>
	<EditorTextfield bind:value={author_name} label="Author Name" maxLength={256}></EditorTextfield>
	<EditorTextfield bind:value={author_url} label="Author URL"></EditorTextfield>
	<EditorTextfield bind:value={author_icon_url} label="Author Icon URL"></EditorTextfield>
</div>

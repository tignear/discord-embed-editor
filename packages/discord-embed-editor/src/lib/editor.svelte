<script lang="ts">
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import EmbedList from './editor/embed-list.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';
	import Card, { Content } from '@smui/card';
	import EditorWebhook from './editor/editor-webhook.svelte';
	import TabBar from '@smui/tab-bar';
	import Tab, { Label } from '@smui/tab';
	import Attachment from './editor/attachment.svelte';
	import type { DiscordFileData, EditorAPIEmbed } from '$lib';
	interface Props {
		content?: string;
		icon?: string;
		username?: string | undefined;
		embeds?: EditorAPIEmbed[];
		files?: DiscordFileData[];
	}

	let {
		content = $bindable(''),
		icon = $bindable(''),
		username = $bindable(undefined),
		embeds = $bindable([]),
		files = $bindable([])
	}: Props = $props();
	let activeControl = $state('Webhook');
</script>

<div>
	<h3>Content</h3>
	<Card>
		<Textfield
			textarea
			bind:value={content}
			label="Content"
			input$rows={8}
			input$maxlength={2000}
			style="width: 100%;"
		>
			{#snippet internalCounter()}
				<CharacterCounter>0 / 2000</CharacterCounter>
			{/snippet}
		</Textfield>
	</Card>

	<EmbedList bind:embeds></EmbedList>

	<h3>Attachments</h3>
	<Card>
		<Content>
			<Attachment bind:files></Attachment>
		</Content>
	</Card>
	<h3>送信</h3>
	<Card>
		<Content>
			<TabBar tabs={['Webhook']} bind:active={activeControl}>
				{#snippet tab(tab)}
					<Tab {tab} minWidth>
						<Label>{tab}</Label>
					</Tab>
				{/snippet}
			</TabBar>
			{#if activeControl === 'Webhook'}
				<EditorWebhook {content} {embeds} bind:icon bind:username {files}></EditorWebhook>
			{/if}
		</Content>
	</Card>
</div>

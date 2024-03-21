<script lang="ts">
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import EmbedList from './editor/embed-list.svelte';
	import type { APIEmbed } from 'discord-api-types/v10';
	import Button from '@smui/button';
	import Card, { Content } from '@smui/card';
	import FormField from '@smui/form-field';
	import EditorWebhook from './editor/editor-webhook.svelte';
	import TabBar from '@smui/tab-bar';
	import Tab, { Label } from '@smui/tab';
	export let content = '';
	export let embeds: APIEmbed[] = [];
	let activeControl = 'Webhook';
</script>

<div>
	<Card>
		<h3>Content</h3>
		<Textfield
			textarea
			bind:value={content}
			label="Content"
			input$rows={8}
			input$maxlength={2000}
			style="width: 100%;"
		>
			<CharacterCounter slot="internalCounter">0 / 2000</CharacterCounter>
		</Textfield>
	</Card>

	<EmbedList bind:embeds></EmbedList>
	<Card>
		<h3>送信</h3>
		<Content>
			<TabBar tabs={['Webhook']} let:tab bind:active={activeControl}>
				<Tab {tab} minWidth>
					<Label>{tab}</Label>
				</Tab>
			</TabBar>
			{#if activeControl === 'Webhook'}
				<EditorWebhook {content} {embeds}></EditorWebhook>
			{/if}
		</Content>
	</Card>
</div>

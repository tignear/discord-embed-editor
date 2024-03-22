<script lang="ts">
	import Button from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Snackbar, { Actions, Label } from '@smui/snackbar';
	import Textfield from '@smui/textfield';
	import type { APIEmbed, RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/v10';
	import type { DiscordFileData } from './attachment.svelte';
	export let webhook_url = '';
	export let content = '';
	export let embeds: APIEmbed[] = [];
	export let username: string | undefined;
	export let icon: string = '';
	export let files: DiscordFileData[];
	let message = '';
	let sending = false;
	let snackbar: Snackbar;
	async function send() {
		const body = new FormData();
		body.set(
			'payload_json',
			JSON.stringify({
				content,
				embeds,
				avatar_url: icon,
				attachments: files.map((file, idx) => {
					return {
						id: idx,
						description: file.description,
						filename: file.file.name
					};
				}),
				username
			} satisfies RESTPostAPIWebhookWithTokenJSONBody)
		);
		let idx = 0;
		for (const file of files) {
			body.set(`files[${idx}]`, file.file);
			++idx;
		}
		const resp = await fetch(webhook_url, {
			body,
			method: 'POST'
		});
		if (resp.status === 200 || resp.status === 204) {
			message = resp.status + ': 送信しました';
			snackbar.open();
		} else {
			const err = await resp.json();
			message = `${resp.status}: ${err.message ? err.message : resp.statusText}`;
			snackbar.open();
			console.error(err);
		}
	}
</script>

<div>
	<Textfield bind:value={webhook_url} label="Webhook URL" style="width: 100%;" required></Textfield>
	<Textfield bind:value={username} label="Username" style="width: 100%" input$emptyValueUndefined
	></Textfield>
	<Textfield bind:value={icon} label="Avatar URL" style="width: 100%"></Textfield>

	<Snackbar bind:this={snackbar} labelText={message} timeoutMs={-1}>
		<Label />
		<Actions>
			<IconButton class="material-icons" title="Dismiss">close</IconButton>
		</Actions>
	</Snackbar>
	<div style="display: flex; justify-content: flex-end; margin: 4px;">
		<Button
			disabled={sending || webhook_url == ''}
			on:click={async () => {
				if (sending) {
					return;
				}
				sending = true;
				try {
					send();
				} finally {
					sending = false;
				}
			}}>送信</Button
		>
	</div>
</div>

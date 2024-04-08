<script lang="ts">
	import type { DiscordFileData } from '$lib';
	import Button from '@smui/button';
	import CircularProgress from '@smui/circular-progress';
	import IconButton from '@smui/icon-button';
	import Snackbar, { Actions, Label } from '@smui/snackbar';
	import Textfield from '@smui/textfield';
	import type { APIEmbed, RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/v10';
	export let webhook_url = '';
	export let content = '';
	export let embeds: APIEmbed[] = [];
	export let username: string | undefined;
	export let icon: string = '';
	export let files: DiscordFileData[];
	export let message_id: string = '';
	let message = '';
	let sending = false;
	let snackbar: Snackbar;
	async function send() {
		const body = new FormData();
		const url = new URL(webhook_url);
		let method;
		if (message_id !== '') {
			if (/\d{17,19}/.test(message_id)) {
				url.pathname += '/messages/' + message_id;
				method = 'PATCH';
			} else {
				message = 'メッセージIDは17-19文字の数字である必要があります。';
				return;
			}
		} else {
			method = 'POST';
			url.searchParams.set('wait', 'true');
		}
		console.log(url);
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
		const resp = await fetch(url, {
			body,
			method
		});
		if (resp.status === 200) {
			message = resp.status + ': 送信しました';
			const d = await resp.json();
			message_id = d.id;
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
	<Textfield bind:value={message_id} label="Message Id" style="width: 100%"></Textfield>
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
		{#if sending}
			<CircularProgress style="height: 32px; width: 32px;" indeterminate />
		{/if}
		<Button
			disabled={sending || webhook_url == ''}
			on:click={async () => {
				if (sending) {
					return;
				}
				sending = true;
				try {
					await send();
				} finally {
					sending = false;
				}
			}}>送信</Button
		>
	</div>
</div>

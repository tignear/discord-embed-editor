<script lang="ts">
	import Button from '@smui/button';

	import FormField from '@smui/form-field';
	import IconButton from '@smui/icon-button';
	import Snackbar, { Actions, Label } from '@smui/snackbar';
	import Textfield from '@smui/textfield';
	import type { APIEmbed } from 'discord-api-types/v10';
	export let webhook_url = '';
	export let content = '';
	export let embeds: APIEmbed[] = [];
	let message = '';
	let sending = false;
	let snackbar: Snackbar;
	async function send() {
		const resp = await fetch(webhook_url, {
			body: JSON.stringify({
				content,
				embeds,
				nonce: String(Math.floor(Date.now() / 1000))
			}),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (resp.status === 204) {
			message = '送信しました';
			snackbar.open();
		} else {
			const err = await resp.json();
			message = err.message;
			snackbar.open();
			console.error(err);
		}
	}
</script>

<div>
	<Textfield bind:value={webhook_url} label="Webhook URL" style="width: 80%"></Textfield>
	<Button
		disabled={sending}
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
	<Snackbar bind:this={snackbar} labelText={message} timeoutMs={-1}>
		<Label />
		<Actions>
			<IconButton class="material-icons" title="Dismiss">close</IconButton>
		</Actions>
	</Snackbar>
</div>

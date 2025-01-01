<script lang="ts">
	import Button from '@smui/button';

	import Checkbox from '@smui/checkbox';

	import Dialog, { Actions, Content } from '@smui/dialog';
	import FormField from '@smui/form-field';
	import Textfield from '@smui/textfield';

	interface Props {
		open?: boolean;
		name?: string;
		description?: string;
		spoiler?: boolean;
	}

	let {
		open = $bindable(false),
		name = $bindable(''),
		description = $bindable(''),
		spoiler = $bindable(false)
	}: Props = $props();
	let name_ = $state(name);
	let description_ = $state(description);
	let spoiler_ = $state(spoiler);

	function onClose(e: any) {
		open = false;
		if (e.detail.action === 'commit') {
			name = name_;
			description = description_;
			spoiler = spoiler_;
		}
	}
</script>

<Dialog aria-describedby="field-edit-content" bind:open onSMUIDialogClosed={onClose}>
	<Content id="field-edit-content">
		<Textfield bind:value={name_} label="Name" style="width: 100%" required></Textfield>
		<Textfield textarea bind:value={description_} label="Description(Alt text)" style="width: 100%"
		></Textfield>
		<FormField>
			<Checkbox bind:checked={spoiler_}></Checkbox>
			{#snippet label()}
				<span>Spoiler</span>
			{/snippet}
		</FormField>
	</Content>

	<Actions>
		<Button action="commit" disabled={name_ == ''}>OK</Button>
	</Actions>
</Dialog>

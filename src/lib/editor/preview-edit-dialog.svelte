<script lang="ts">
	import Button from '@smui/button';

	import Checkbox from '@smui/checkbox';

	import Dialog, { Actions, Content } from '@smui/dialog';
	import FormField from '@smui/form-field';
	import Textfield from '@smui/textfield';
	export let open = false;
	export let name: string = '';
	let name_ = name;
	export let description: string = '';
	let description_ = description;
	export let spoiler: boolean = false;
	let spoiler_ = spoiler;

	function onClose(e: any) {
		open = false;
		if (e.detail.action === 'commit') {
			name = name_;
			description = description_;
			spoiler = spoiler_;
		}
	}
</script>

<Dialog aria-describedby="field-edit-content" bind:open on:SMUIDialog:closed={onClose}>
	<Content id="field-edit-content">
		<Textfield bind:value={name_} label="Name" style="width: 100%" required></Textfield>
		<Textfield textarea bind:value={description_} label="Description(Alt text)" style="width: 100%"
		></Textfield>
		<FormField>
			<Checkbox bind:checked={spoiler_}></Checkbox>
			<span slot="label">Spoiler</span>
		</FormField>
	</Content>

	<Actions>
		<Button action="commit" disabled={name_ == ''}>OK</Button>
	</Actions>
</Dialog>

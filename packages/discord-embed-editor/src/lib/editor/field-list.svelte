<script lang="ts">
	import { run } from 'svelte/legacy';

	import Button from '@smui/button';
	import Checkbox from '@smui/checkbox';
	import DataTable, { Head, Row, Cell, Body, Pagination } from '@smui/data-table';
	import Dialog, { Actions, Content } from '@smui/dialog';
	import FormField from '@smui/form-field';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import type { APIEmbed } from 'discord-api-types/v10';
	interface Props {
		fields?: APIEmbed['fields'] | undefined;
	}

	let { fields = $bindable(undefined) }: Props = $props();
	let fields_ = $derived(fields == undefined ? [] : fields);
	let editingIndex: number | undefined = undefined;
	let inline: boolean = $state(false);
	let name: string = $state('');
	let value: string = $state('');
	let open = $state(false);
	const rowsPerPage = 5;
	let currentPage = $state(0);

	let start = $derived(currentPage * rowsPerPage);
	let end = $derived(Math.min(start + rowsPerPage, fields_.length));
	let slice = $derived(fields_.slice(start, end));
	let lastPage = $derived(Math.max(Math.ceil(fields_.length / rowsPerPage) - 1, 0));

	run(() => {
		if (currentPage > lastPage) {
			currentPage = lastPage;
		}
	});

	function editRow(idx: number) {
		editingIndex = currentPage * rowsPerPage + idx;
		if (fields) {
			const field = fields[editingIndex]!;
			name = field.name;
			value = field.value;
			inline = field.inline ?? false;
			open = true;
		}
	}
	async function onClose(e: any) {
		if (editingIndex == undefined) {
			return;
		}
		if (e.detail.action === 'delete') {
			fields = fields?.toSpliced(editingIndex, 1);
			return;
		}
		if (e.detail.action === 'close') {
			fields = fields?.toSpliced(editingIndex, 1, {
				name: name!,
				value: value!,
				inline
			});
		}
	}
</script>

<div>
	<h4>Fields</h4>
	<div style="display: flex;">
		<div style="flex-grow: 1;">
			<DataTable style="width: 100%;">
				<Head>
					<Row>
						<Cell>Name</Cell>
						<Cell>Value</Cell>
						<Cell>Inline</Cell>
					</Row>
				</Head>
				<Body>
					{#each slice as field, idx}
						<Row onclick={() => editRow(idx)}>
							<Cell
								style="max-width: 0; width: 30%; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"
								>{field.name}</Cell
							>
							<Cell
								style="max-width: 0; width: 60%; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"
								>{field.value}</Cell
							>
							<Cell style="width: 10%;">
								{field.inline ? '✅' : '❌'}
							</Cell>
						</Row>
					{/each}
				</Body>
				{#snippet paginate()}
					<Pagination>
						<IconButton
							class="material-icons"
							action="first-page"
							title="First page"
							onclick={() => (currentPage = 0)}
							disabled={currentPage === 0}>first_page</IconButton
						>
						<IconButton
							class="material-icons"
							action="prev-page"
							title="Prev page"
							onclick={() => currentPage--}
							disabled={currentPage === 0}>chevron_left</IconButton
						>
						<IconButton
							class="material-icons"
							action="next-page"
							title="Next page"
							onclick={() => currentPage++}
							disabled={currentPage === lastPage}>chevron_right</IconButton
						>
						<IconButton
							class="material-icons"
							action="last-page"
							title="Last page"
							onclick={() => (currentPage = lastPage)}
							disabled={currentPage === lastPage}>last_page</IconButton
						>
					</Pagination>
				{/snippet}
			</DataTable>
		</div>
		<div style="display: flex; align-items:flex-end;">
			<Button
				onclick={() => {
					fields = fields == undefined ? [] : fields;
					fields = fields.toSpliced(fields.length, 0, {
						name: 'new field',
						value: 'new field',
						inline: false
					});
				}}>フィールドを追加</Button
			>
		</div>
	</div>

	<Dialog aria-describedby="field-edit-content" bind:open onSMUIDialogClosed={onClose}>
		<Content id="field-edit-content">
			<Textfield bind:value={name} label="Name" input$maxlength={256} style="width: 100%">
				{#snippet helper()}
					<CharacterCounter>0 / 256</CharacterCounter>
				{/snippet}
			</Textfield>
			<Textfield textarea bind:value label="Value" input$maxlength={1024} style="width: 100%">
				{#snippet helper()}
					<CharacterCounter>0 / 1024</CharacterCounter>
				{/snippet}
			</Textfield>
			<FormField>
				<Checkbox bind:checked={inline}></Checkbox>
				{#snippet label()}Inline{/snippet}
			</FormField>
		</Content>

		<Actions>
			<Button action="delete">削除</Button>
			<Button action="close">OK</Button>
		</Actions>
	</Dialog>
</div>

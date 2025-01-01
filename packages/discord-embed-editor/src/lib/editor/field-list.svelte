<script lang="ts">
	import Button from '@smui/button';
	import Checkbox from '@smui/checkbox';
	import DataTable, { Head, Row, Cell, Body, Pagination } from '@smui/data-table';
	import Dialog, { Actions, Content } from '@smui/dialog';
	import FormField from '@smui/form-field';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import type { APIEmbed } from 'discord-api-types/v10';
	export let fields: APIEmbed['fields'] | undefined = undefined;
	$: fields_ = fields == undefined ? [] : fields;
	let editingIndex: number | undefined = undefined;
	let inline: boolean | undefined = undefined;
	let name: string = '';
	let value: string = '';
	let open = false;
	const rowsPerPage = 5;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, fields_.length);
	$: slice = fields_.slice(start, end);
	$: lastPage = Math.max(Math.ceil(fields_.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}

	function editRow(idx: number) {
		editingIndex = currentPage * rowsPerPage + idx;
		if (fields) {
			const field = fields[editingIndex]!;
			name = field.name;
			value = field.value;
			inline = field.inline;
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
						<Row on:click={() => editRow(idx)}>
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
				<Pagination slot="paginate">
					<IconButton
						class="material-icons"
						action="first-page"
						title="First page"
						on:click={() => (currentPage = 0)}
						disabled={currentPage === 0}>first_page</IconButton
					>
					<IconButton
						class="material-icons"
						action="prev-page"
						title="Prev page"
						on:click={() => currentPage--}
						disabled={currentPage === 0}>chevron_left</IconButton
					>
					<IconButton
						class="material-icons"
						action="next-page"
						title="Next page"
						on:click={() => currentPage++}
						disabled={currentPage === lastPage}>chevron_right</IconButton
					>
					<IconButton
						class="material-icons"
						action="last-page"
						title="Last page"
						on:click={() => (currentPage = lastPage)}
						disabled={currentPage === lastPage}>last_page</IconButton
					>
				</Pagination>
			</DataTable>
		</div>
		<div style="display: flex; align-items:flex-end;">
			<Button
				on:click={() => {
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

	<Dialog aria-describedby="field-edit-content" bind:open on:SMUIDialog:closed={onClose}>
		<Content id="field-edit-content">
			<Textfield bind:value={name} label="Name" input$maxlength={256} style="width: 100%">
				<svelte:fragment slot="helper">
					<CharacterCounter>0 / 256</CharacterCounter>
				</svelte:fragment>
			</Textfield>
			<Textfield textarea bind:value label="Value" input$maxlength={1024} style="width: 100%">
				<svelte:fragment slot="helper">
					<CharacterCounter>0 / 1024</CharacterCounter>
				</svelte:fragment>
			</Textfield>
			<FormField>
				<Checkbox bind:checked={inline}></Checkbox>
				<span slot="label">Inline</span>
			</FormField>
		</Content>

		<Actions>
			<Button action="delete">削除</Button>
			<Button action="close">OK</Button>
		</Actions>
	</Dialog>
</div>

<script lang="ts">
	import { EmbedType, type APIEmbed } from 'discord-api-types/v10';
	import TabBar from '@smui/tab-bar';
	import Tab, { Label } from '@smui/tab';
	import Button from '@smui/button';
	import { tick } from 'svelte';
	import Card, { ActionButtons, Actions, Content } from '@smui/card';
	import EmbedEdit from './embed-edit.svelte';
	import { newEmptyEmbed, type EditorAPIEmbed } from '$lib';
	export let embeds: EditorAPIEmbed[] = [];

	let active: string | undefined = embeds.length === 0 ? undefined : '0';
	function onMoveUp() {
		const idx = Number.parseInt(active!);
		embeds = embeds.toSpliced(idx - 1, 2, embeds[idx]!, embeds[idx - 1]!);
		active = String(idx - 1);
	}
	function onMoveDown() {
		const idx = Number.parseInt(active!);
		embeds = embeds.toSpliced(idx, 2, embeds[idx + 1]!, embeds[idx]!);
		active = String(idx + 1);
	}
	function onDelete() {
		const idx = Number.parseInt(active!);
		embeds = embeds.toSpliced(idx, 1);
		active = idx === 0 ? (embeds.length === 0 ? undefined : '0') : String(idx - 1);
	}

	async function onAdd() {
		if (active === undefined) {
			embeds = [newEmptyEmbed()];
			active = '0';
		} else {
			const idx = Number.parseInt(active);
			embeds = embeds.toSpliced(idx + 1, 0, newEmptyEmbed());
			await tick();
			active = String(idx + 1);
		}
	}
	$: activeIndex = active === undefined ? undefined : Number.parseInt(active!);
</script>

<div>
	<h3>Embeds</h3>
	<Card>
		<Content>
			<TabBar tabs={[...embeds.map((_, idx) => String(idx))]} let:tab bind:active>
				<Tab {tab} minWidth>
					<Label>Embed {Number.parseInt(tab) + 1}</Label>
				</Tab>
			</TabBar>
			{#each embeds as embed, idx}
				<div style={activeIndex === idx ? '' : 'display: none'}>
					<EmbedEdit bind:embed></EmbedEdit>
				</div>
			{/each}
		</Content>
		<Actions>
			<ActionButtons>
				<Button disabled={active === undefined} on:click={() => onDelete()}>削除</Button>
				<Button disabled={active === '0' || active === undefined} on:click={() => onMoveUp()}
					>上へ移動</Button
				>
				<Button
					disabled={active === `${embeds.length - 1}` || active === undefined}
					on:click={() => onMoveDown()}>下へ移動</Button
				>
				<Button
					on:click={() => {
						onAdd();
					}}>追加</Button
				>
			</ActionButtons>
		</Actions>
	</Card>
</div>

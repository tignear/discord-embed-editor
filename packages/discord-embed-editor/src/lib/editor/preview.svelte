<script lang="ts" module>
</script>

<script lang="ts">
	import { run } from 'svelte/legacy';

	import { Icon } from '@smui/common';
	import PreviewImage from './preview-image.svelte';
	import IconButton from '@smui/icon-button';
	import PreviewEditDialog from './preview-edit-dialog.svelte';
	import { createEventDispatcher } from 'svelte';
	import { Segment } from '@smui/segmented-button';
	import SegmentedButton from '@smui/segmented-button';
	import Snackbar, { Actions, Label } from '@smui/snackbar';
	import { IMAGE_MIME_TYPES } from '$lib';
	interface Props {
		file: File;
		description?: string;
		spoiler: boolean;
	}

	let { file = $bindable(), description = $bindable(''), spoiler = $bindable() }: Props = $props();
	let name = $state(file.name);
	run(() => {
		file = new File([file], name, {
			type: file.type,
			lastModified: file.lastModified
		});
	});
	let open = $state(false);
	let isImage = $derived(IMAGE_MIME_TYPES.includes(file.type));
	const dispatch = createEventDispatcher();
	let copiedSnackbar: Snackbar = $state();
	let copiedFileName = $state('');
	const actions: Record<any, () => void> = {
		link() {
			const filename = file.name;
			navigator.clipboard.writeText(`attachment://${filename}`).then(() => {
				copiedSnackbar.open();
				copiedFileName = filename;
			});
		},
		edit() {
			open = true;
		},
		delete() {
			dispatch('delete');
		}
	};
</script>

<div class="wrapper">
	<div class="control">
		<SegmentedButton segments={['link', 'edit', 'delete']} >
			{#snippet children({ segment })}
						<Segment {segment} on:click$preventDefault={actions[segment]}
					><Icon class="material-icons">{segment}</Icon></Segment
				>
								{/snippet}
				</SegmentedButton>
	</div>

	<figure>
		{#if isImage}
			<PreviewImage {file} {description}></PreviewImage>
		{:else}
			<Icon class="material-icons attachment">attachment</Icon>
		{/if}
		<figcaption class="attachment-preview-support">
			{file.name}
		</figcaption>
	</figure>
	<PreviewEditDialog bind:open bind:description bind:spoiler bind:name></PreviewEditDialog>
	<Snackbar bind:this={copiedSnackbar}>
		<Label>{copiedFileName}へのリンクをコピーしました。</Label>
		<Actions>
			<IconButton class="material-icons" title="Dismiss">close</IconButton>
		</Actions>
	</Snackbar>
</div>

<style>
	.wrapper {
		margin-top: 1rem;
		position: relative;
	}
	.control {
		position: absolute;
		right: 1rem;
		top: -0.5rem;
	}
	* :global(i.material-icons.attachment) {
		font-size: 10rem;
	}
	* :global(.attachment-preview-support) {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 8rem;
	}
</style>

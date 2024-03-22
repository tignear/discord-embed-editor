<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Icon } from '@smui/common';
	import PreviewImage from './preview-image.svelte';
	import IconButton from '@smui/icon-button';
	import PreviewEditDialog from './preview-edit-dialog.svelte';
	import { createEventDispatcher } from 'svelte';
	export let file: File;
	export let description: string = '';
	export let spoiler: boolean;
	let name = file.name;
	$: {
		file = new File([file], name, {
			type: file.type,
			lastModified: file.lastModified
		});
	}
	let open = false;
	$: isImage = ['image/png', 'image/jpeg', 'image/gif'].includes(file.type);
	const dispatch = createEventDispatcher();
</script>

<div class="wrapper">
	<div class="control">
		<IconButton
			class="material-icons"
			on:click={() => {
				open = true;
			}}>edit</IconButton
		>
		<IconButton
			class="material-icons"
			on:click={() => {
				dispatch('delete');
			}}>delete</IconButton
		>
	</div>
	<figure>
		{#if isImage}
			<PreviewImage {file}></PreviewImage>
		{:else}
			<Icon class="material-icons attachment">attachment</Icon>
		{/if}
		<figcaption class="attachment-preview-support">
			{file.name}
		</figcaption>
	</figure>
	<PreviewEditDialog bind:open bind:description bind:spoiler bind:name></PreviewEditDialog>
</div>

<style>
	.wrapper {
		margin-top: 1rem;
		position: relative;
	}
	.control {
		display: flex;
		flex-direction: column;
		position: absolute;
		right: -0.5rem;
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

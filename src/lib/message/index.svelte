<script lang="ts">
	import Avatar from './avatar.svelte';
	import Header from './header.svelte';
	import MessageContent from './message-content.svelte';

	export let message: string = '';
	export let icon: string | undefined = undefined;
	export let timestamp: string;
</script>

<div class="message">
	<Header {timestamp}></Header>
	<Avatar src={icon} />
	<MessageContent {message}></MessageContent>
</div>

<style>
	.message {
		background-color: rgb(49, 51, 56);
		color: rgb(219, 222, 225);
		padding-left: 72px;
		padding-right: 48px;
		position: relative;
		min-height: 2.75rem;
		font-family: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
</style>

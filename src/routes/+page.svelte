<script lang="ts">
	import Message from '$lib/message/index.svelte';
	let message='aaaa';
	let timestamp = 'Today at 08:42';
</script>

<Message {message} {timestamp}></Message>

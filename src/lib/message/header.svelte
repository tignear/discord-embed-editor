<script lang="ts">
	const DEFAULT_USERNAME = 'Spidey Bot';
	export let username = '';
	export let timestamp: string;
</script>

<span class="header">
	<span class="username-wrapper">
		<span class="username">{username.length ? username : DEFAULT_USERNAME}</span>
	</span>
	<span class="timestamp-wrapper">
		<span class="timestamp">
			{timestamp}
		</span>
	</span>
</span>

<style>
	.header {
		display: block;
		position: relative;
		line-height: 1.375rem;
		min-height: 1.375rem;
		white-space: break-spaces;
		word-wrap: pre-wrap;
	}
	.timestamp {
		font-size: 0.75rem;
		line-height: 1.375rem;
		color: hsl(214 calc(1 * 8.1%) 61.2% / 1);
	}
	.username-wrapper {
		padding-right: 2px;
	}
	.username {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.375rem;
		color: hsl(220 calc(1 * 13%) 95.5% / 1);
		display: inline;
		vertical-align: baseline;
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
	}
</style>

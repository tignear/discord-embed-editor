<!-- https://github.com/metonym/svelte-highlight/blob/0dfb16ab9750ad1a54ad4af5b96a7e216d47d0df/src/LangTag.svelte -->
<script lang="ts">
	// @ts-check

	

	

	

	
	interface Props {
		/** @type {any} */
		code: string;
		/** @type {string} */
		highlighted: string|null|undefined;
		/** @type {string} */
		languageName?: string;
		langtag?: boolean;
		[key: string]: any
	}

	let {
		code,
		highlighted,
		languageName = 'plaintext',
		langtag = false,
		...rest
	}: Props = $props();
</script>

<pre class:langtag data-language={languageName} {...rest}><code class:hljs={true}
		>{#if highlighted}{@html highlighted}{:else}{code}{/if}</code
	></pre>

<style>
	.langtag {
		position: relative;
	}
	pre {
		margin: 0;
    margin-top: 6px;
	}
	code {
		font-size: 0.875rem;
		line-height: 1.125rem;
		text-indent: 0;
		text-indent: 0;
		white-space: pre-wrap;
		scrollbar-width: thin;
    background-color: hsl(220 calc(1 * 6.5%) 18% / 1);
		border: 1px solid hsl(225 calc(1 * 6.3%) 12.5% / 1);
	}
	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		border-radius: 4px;
		text-size-adjust: none;
	}
	.langtag::after {
		content: attr(data-language);
		position: absolute;
		top: 0;
		right: 0;
		padding: 1em;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--langtag-background, inherit);
		color: var(--langtag-color, inherit);
		border-radius: var(--langtag-border-radius);
	}
</style>

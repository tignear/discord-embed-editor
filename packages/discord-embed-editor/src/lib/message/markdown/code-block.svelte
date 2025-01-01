<script lang="ts">

  import "highlight.js/styles/github-dark.css";
	import Highlight from "./highlight.svelte";
	interface Props {
		node: { content: string; lang: string };
	}

	let { node }: Props = $props();
</script>

<Highlight code={node.content} language={node.lang}></Highlight>

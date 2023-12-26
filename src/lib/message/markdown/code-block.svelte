<script lang="ts">

	export let node: { content: string; lang: string };
  import "highlight.js/styles/github-dark.css";
	import Highlight from "./highlight.svelte";
</script>

<Highlight code={node.content} language={node.lang}></Highlight>

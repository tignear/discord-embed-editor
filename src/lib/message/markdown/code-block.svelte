<script lang="ts">
	import Highlight from './highlight.svelte';

	export let node: { content: string; lang: string };
  import "highlight.js/styles/github-dark.css";
  $:{
    console.log(node);
  }
</script>

<Highlight code={node.content} language={node.lang}></Highlight>

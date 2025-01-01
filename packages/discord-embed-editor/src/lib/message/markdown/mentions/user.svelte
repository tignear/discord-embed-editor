<script lang="ts">
	import AtMention from './at-mention.svelte';
  export let node: {id: string};
</script>

<AtMention text={node.id}></AtMention>

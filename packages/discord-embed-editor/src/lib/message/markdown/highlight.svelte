<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<!--modified https://github.com/metonym/svelte-highlight/blob/0dfb16ab9750ad1a54ad4af5b96a7e216d47d0df/src/Highlight.svelte-->
<script lang="ts">
  export let language: string;

  /** @type {any} */
  export let code: string;

  /** @type {boolean} */
  export let langtag = false;

  import hljs from "highlight.js";
  import { createEventDispatcher, afterUpdate } from "svelte";
  import LangTag from "./lang-tag.svelte";

  const dispatch = createEventDispatcher();

  /** @type {string} */
  let highlighted = "";

  afterUpdate(() => {
    if (highlighted) dispatch("highlight", { highlighted });
  });

  $: {
    highlighted = hljs.highlight(code, { language }).value;
  }
</script>

<slot {highlighted}>
  <LangTag
    {...$$restProps}
    languageName={language}
    {langtag}
    {highlighted}
    {code}
  />
</slot>
import type { parse } from "discord-markdown-parser";
import type { ComponentConstructorOptions, SvelteComponent } from "svelte";
import _Basic, { tag } from "./basic.svelte";
import _Heading from "./heading.svelte";
import _List from "./list.svelte";
import _Url from "./url.svelte";
import _CodeBlock from "./code-block.svelte";
import _BlockQuote from "./block-quote.svelte";

type SvelteComponentFactory = { new(options: ComponentConstructorOptions): SvelteComponent };
const Basic = _Basic as SvelteComponentFactory;
const Heading = _Heading as SvelteComponentFactory;
const List = _List as SvelteComponentFactory;
const Url = _Url as SvelteComponentFactory;
const CodeBlock = _CodeBlock as SvelteComponentFactory;
const BlockQuote = _BlockQuote as SvelteComponentFactory;
export type ASTNode = ReturnType<typeof parse>[0];
export const renderer: Record<string, SvelteComponentFactory> = {
  heading: Heading,
  list: List,
  url: Url,
  link: Url,
  codeBlock: CodeBlock,
  blockQuote: BlockQuote,
  ...Object.fromEntries(Object.keys(tag).map(e => [e, Basic]))
};
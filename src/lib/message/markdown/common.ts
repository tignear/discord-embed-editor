import type { parse } from "discord-markdown-parser";
import type { ComponentConstructorOptions, SvelteComponent } from "svelte";
import _Basic, { tag } from "./basic.svelte";
import _Heading from "./heading.svelte";
import _List from "./list.svelte";
import _Url from "./url.svelte";
import _CodeBlock from "./code-block.svelte";
import _BlockQuote from "./block-quote.svelte";
import _Everyone from "./mentions/everyone.svelte";
import _Here from "./mentions/here.svelte";
import _User from "./mentions/user.svelte";
import _Channel from "./mentions/channel.svelte";
import StandardEmoji from "./standard-emoji.svelte";
import CustomEmoji from "./custom-emoji.svelte";
import Timestamp from "./mentions/timestamp.svelte";

type SvelteComponentFactory = { new(options: ComponentConstructorOptions): SvelteComponent };
const Basic = _Basic as SvelteComponentFactory;
const Heading = _Heading as SvelteComponentFactory;
const List = _List as SvelteComponentFactory;
const Url = _Url as SvelteComponentFactory;
const CodeBlock = _CodeBlock as SvelteComponentFactory;
const BlockQuote = _BlockQuote as SvelteComponentFactory;
const Everyone = _Everyone as SvelteComponentFactory;
const Here = _Here as SvelteComponentFactory;
const User = _User as SvelteComponentFactory;
const Channel = _Channel as SvelteComponentFactory;

export type ASTNode = ReturnType<typeof parse>[0];
export const renderer: Record<string, SvelteComponentFactory> = {
  heading: Heading,
  url: Url,
  link: Url,

  ...Object.fromEntries(Object.keys(tag).map(e => [e, Basic]))
};
export const simpleRenderer: Record<string, SvelteComponentFactory> = {
  blockQuote: BlockQuote,

}
export const leafRenderer: Record<string,SvelteComponentFactory> ={
  everyone: Everyone,
  here: Here,
}
export const nodeRenderer: Record<string,SvelteComponentFactory> ={
  list: List,
  codeBlock: CodeBlock,
  twemoji: StandardEmoji as SvelteComponentFactory,
  emoji: CustomEmoji as SvelteComponentFactory,
  timestamp: Timestamp as SvelteComponentFactory,
  user: User,
  role: User,
  channel: Channel,
}
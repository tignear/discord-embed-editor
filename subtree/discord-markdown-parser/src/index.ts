import SimpleMarkdown from 'simple-markdown';

// import all the rules
import { everyone } from './rules/discord/everyone.js';
import { twemoji } from './rules/discord/twemoji.js';
import { channel } from './rules/discord/channel.js';
import { timestamp } from './rules/discord/time.js';
import { blockQuote } from './rules/blockQuote.js';
import { strikethrough } from './rules/strike.js';
import { codeBlock } from './rules/codeBlock.js';
import { emoji } from './rules/discord/emoji.js';
import { role } from './rules/discord/role.js';
import { autolink } from './rules/autolink.js';
import { here } from './rules/discord/here.js';
import { emoticon } from './rules/emoticon.js';
import { user } from './rules/discord/user.js';
import { spoiler } from './rules/spoiler.js';
import { heading } from './rules/heading.js';
import { text } from './rules/text.js';
import { url } from './rules/url.js';
import { em } from './rules/em.js';
import { br } from './rules/br.js';
import { list } from './rules/list.js';

// rules normal users can use
export const rules = {
  blockQuote,
  codeBlock,
  newline: SimpleMarkdown.defaultRules.newline,
  escape: SimpleMarkdown.defaultRules.escape,
  autolink,
  url,
  em,
  strong: SimpleMarkdown.defaultRules.strong,
  underline: SimpleMarkdown.defaultRules.u,
  strikethrough,
  inlineCode: SimpleMarkdown.defaultRules.inlineCode,
  text,
  emoticon,
  br,
  spoiler,
  heading,
  list,
  link: SimpleMarkdown.defaultRules.link,

  // discord specific
  user,
  channel,
  role,
  emoji,
  everyone,
  here,
  twemoji,
  timestamp,
};


// build the parser
const parser = SimpleMarkdown.parserFor(rules);

// parse function
export function parse(input: string) {
  return parser(input, { inline: true });
}

export default parse;

// some types
export type RuleTypes = keyof typeof rules;

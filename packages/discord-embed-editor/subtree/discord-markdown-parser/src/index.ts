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
import { slashCommand } from './rules/discord/slashCommand.js';


export const rulesForEmbedField = {
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
  slashCommand
}

// rules normal users can use
export const rules = {
  ...rulesForEmbedField,
  heading,
};

// build the parser
const parser = SimpleMarkdown.parserFor(rules);
const parserForEmbedField = SimpleMarkdown.parserFor(rulesForEmbedField);

// parse function
export function parse(input: string, target: "content" | "embedField" = "content") {
  if (target === "content") {
    return parser(input, { inline: true });
  } else {
    return parserForEmbedField(input, { inline: true });
  }
}


export default parse;

// some types
export type RuleTypes = keyof typeof rules;
export type EmbedFieldRuleTypes = keyof typeof rulesForEmbedField;

import SimpleMarkdown from 'simple-markdown';
import { SlashCommandRegex } from '../../utils/regex.js';

export const slashCommand: SimpleMarkdown.ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => SlashCommandRegex.exec(source),
  parse: function (capture) {
    const hasGroup = capture[3] != undefined;
    return {
      name: capture[1],
      id: capture[4],
      subcommand: hasGroup ? capture[3] : capture[2],
      subcommandGroup: hasGroup ? capture[2] : undefined
    }
  },
};

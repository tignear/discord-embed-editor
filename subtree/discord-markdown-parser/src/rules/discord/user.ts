import SimpleMarkdown = require('simple-markdown'); 
import { UserMentionRegex } from '../../utils/regex.js';

export const user: SimpleMarkdown.ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => UserMentionRegex.exec(source),
  parse: function (capture) {
    return {
      id: capture[1],
      type: 'user',
    };
  },
};

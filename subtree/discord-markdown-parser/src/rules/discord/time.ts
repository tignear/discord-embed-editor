import SimpleMarkdown = require('simple-markdown');import { TimestampRegex } from '../../utils/regex.js';

export const timestamp: SimpleMarkdown.ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => TimestampRegex.exec(source),
  parse: function (capture) {
    return {
      timestamp: capture[1],
      format: capture[2],
    };
  },
};

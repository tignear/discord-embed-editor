import SimpleMarkdown = require('simple-markdown');import { EveryoneRegex } from '../../utils/regex.js';

export const everyone: SimpleMarkdown.ParserRule = {
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source) => EveryoneRegex.exec(source),
  parse: function () {
    return {};
  },
};

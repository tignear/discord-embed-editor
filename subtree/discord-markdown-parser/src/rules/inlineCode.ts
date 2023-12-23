import SimpleMarkdown = require('simple-markdown');
import { extend } from '../utils/extend.js';

export const inlineCode = extend(
  {
    match: (source) => SimpleMarkdown.defaultRules.inlineCode.match.regex!.exec(source),
  },
  SimpleMarkdown.defaultRules.inlineCode
);

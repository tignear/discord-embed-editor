import SimpleMarkdown from 'simple-markdown';
import { extend } from '../utils/extend.js';
import { StrikeThroughRegex } from '../utils/regex.js';

export const strikethrough = extend(
  {
    match: SimpleMarkdown.inlineRegex(StrikeThroughRegex),
  },
  SimpleMarkdown.defaultRules.del
);

import SimpleMarkdown from 'simple-markdown';
import { extend } from '../utils/extend.js';

export const br = extend(
  {
    match: SimpleMarkdown.anyScopeRegex(/^\n/),
  },
  SimpleMarkdown.defaultRules.br
);

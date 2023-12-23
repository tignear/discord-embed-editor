import SimpleMarkdown = require('simple-markdown');
import { extend } from '../utils/extend.js';
import { TextRegex } from '../utils/regex.js';

export const text = extend(
  {
    match: (source) => TextRegex.exec(source),
  },
  SimpleMarkdown.defaultRules.text
);

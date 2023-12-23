import SimpleMarkdown = require('simple-markdown');
import { extend } from '../utils/extend.js';
import { HeadingRegex } from '../utils/regex.js';

export const heading = extend(
  {
    match: function (source, state) {
      if (state.disallowBlock) {
        return null;
      }
      if (state.prevCapture === null || state.prevCapture[0] === '\n') {
        return HeadingRegex.exec(source);
      }
      return null;
    },
    parse: function (capture, parse, state) {
      const disallowBlock = state.disallowBlock;
      state.disallowBlock = true;
      const result = SimpleMarkdown.defaultRules.heading.parse(capture, parse, state);
      state.disallowBlock = disallowBlock;
      return result;
    },
  },
  SimpleMarkdown.defaultRules.heading
);

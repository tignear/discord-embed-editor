import SimpleMarkdown from 'simple-markdown';
import { extend } from '../utils/extend.js';
import { HeadingRegex } from '../utils/regex.js';

export const heading = extend(
  {
    match: function (source, state) {
      console.log("heading", state)
      if (state.disallowBlock) {
        return null;
      }
      if (state.prevCapture == null || state.prevCapture[0] === "\n" || ["#", "##", "###"].includes(state.prevCapture[1])) {
        return HeadingRegex.exec(source);
      }
      return null;
    },
    parse: function (capture) {
      return {
        type: "heading",
        level: capture[1].length,
        content: [{ type: "text", content: capture[2].trim() }]
      };
    },

  },
  SimpleMarkdown.defaultRules.heading
);

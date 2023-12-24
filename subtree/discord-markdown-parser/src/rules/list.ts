import SimpleMarkdown from 'simple-markdown';
import { extend } from '../utils/extend.js';

const LIST_BULLET = '(?:[*-]|\\d+.)';
// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
const LIST_ITEM_PREFIX = '( *)(' + LIST_BULLET + ') +';
const LIST_ITEM_PREFIX_R = new RegExp('^' + LIST_ITEM_PREFIX);
const LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;
// recognize an individual list item:
//  * hi
//    this is part of the same item
//
//    as is this, which is a new paragraph in the same item
//
//  * but this is not part of the same item
const LIST_ITEM_R = new RegExp(
  LIST_ITEM_PREFIX +
  "[^\\n]*(?:\\n" +
  "(?!\\1" + LIST_BULLET + " )[^\\n]*)*(\n|$)",
  "gm"
);
const BLOCK_END_R = /\n{1,}$/;
// recognize the end of a paragraph block inside a list item:
// two or more newlines at end end of the item
const LIST_BLOCK_END_R = BLOCK_END_R;
const LIST_ITEM_END_R = / *\n+$/;
export const list = extend(
  {
    match: function (source, state): SimpleMarkdown.Capture | null {
      // We only want to break into a list if we are at the start of a
      // line. This is to avoid parsing "hi * there" with "* there"
      // becoming a part of a list.
      // You might wonder, "but that's inline, so of course it wouldn't
      // start a list?". You would be correct! Except that some of our
      // lists can be inline, because they might be inside another list,
      // in which case we can parse with inline scope, but need to allow
      // nested lists inside this inline scope.
      const prevCaptureStr = state.prevCapture == null ? '' : state.prevCapture[0];
      const isStartOfLineCapture = LIST_LOOKBEHIND_R.exec(prevCaptureStr);
      const allowList = (!state.disallowBlock || (state.listDepth ?? 0) > 0) && (state.listDepth ?? 0) < 11;
      let result = "";
      let initialPrefix: string | null = null;
      let initialBullet: string | null = null;
      if (isStartOfLineCapture && allowList) {
        while (source.length) {
          const m = LIST_ITEM_PREFIX_R.exec(source);
          if (m == null) {
            return result.length === 0 ? null : [result, initialPrefix!, initialBullet!];
          }
          const [, prefix, bullet] = [...m];
          initialPrefix ??= prefix;
          initialBullet ??= bullet;
          if (initialPrefix.length > prefix.length) {
            return [result, initialPrefix, initialBullet];
          }
          const idx = source.indexOf("\n");
          if (idx === -1) {
            result += source;
            return [result, initialPrefix, initialBullet];
          }
          result += source.slice(0, idx + 1);
          source = source.slice(idx + 1);
        }
        return result.length === 0 ? null : [result, initialPrefix!, initialBullet!];
      } else {
        return null;
      }
    },
    parse: function (capture, parse, state) {
      const listDepth = state.listDepth;
      const disallowBlock = state.disallowBlock;
      state.disallowBlock = true;
      state.listDepth = (state.listDepth ?? 0) + 1;

      const bullet = capture[2];
      const ordered = bullet.length > 1;
      const start = ordered ? +bullet : undefined;
      const items = /** @type {string[]} */ (
        capture[0]
          .replace(LIST_BLOCK_END_R, "")
          .match(LIST_ITEM_R)!
      );

      // We know this will match here, because of how the regexes are
      // defined
      /*:: items = ((items : any) : Array<string>) */

      const itemContent = items.map(function (/** @type {string} */ item: string) {
        // We need to see how far indented this item is:
        const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
        const space = prefixCapture ? prefixCapture[0].length : 0;
        // And then we construct a regex to "unindent" the subsequent
        // lines of the items by that amount:
        const spaceRegex = new RegExp("^ {1," + space + "}", "gm");

        // Before processing the item, we need a couple things
        const content = item
          // remove indents on trailing lines:
          .replace(spaceRegex, '')
          // remove the bullet:
          .replace(LIST_ITEM_PREFIX_R, '');
        const adjustedContent = content.replace(LIST_ITEM_END_R, "");
        console.log(adjustedContent);
        const result = parse(adjustedContent, state);
        return result;
      });

      state.listDepth = listDepth;
      state.disallowBlock = disallowBlock;
      return {
        ordered: ordered,
        start: start,
        items: itemContent,
      };
    },
  },
  SimpleMarkdown.defaultRules.list
);

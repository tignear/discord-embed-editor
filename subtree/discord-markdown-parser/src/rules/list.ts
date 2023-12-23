import SimpleMarkdown from 'simple-markdown';
import { extend } from '../utils/extend.js';

const LIST_BULLET = '(?:[*-]|\\d+.)';
// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
const LIST_ITEM_PREFIX = '( *)(' + LIST_BULLET + ') +';
const LIST_ITEM_PREFIX_R = new RegExp('^' + LIST_ITEM_PREFIX);
// recognize an individual list item:
//  * hi
//    this is part of the same item
//
//    as is this, which is a new paragraph in the same item
//
//  * but this is not part of the same item
const LIST_ITEM_R = new RegExp(LIST_ITEM_PREFIX + '[^\\n]*(?:\\n' + '(?!\\1' + LIST_BULLET + ' )[^\\n]*)*(\n|$)', 'gm');
const BLOCK_END_R = /\n{2,}$/;
// recognize the end of a paragraph block inside a list item:
// two or more newlines at end end of the item
const LIST_BLOCK_END_R = BLOCK_END_R;
const LIST_ITEM_END_R = / *\n+$/;
// check whether a list item has paragraphs: if it does,
// we leave the newlines at the end
const LIST_R = new RegExp(
  '^( *)(' +
    LIST_BULLET +
    ') ' +
    '[\\s\\S]+?(?:\n{2,}(?! )' +
    '(?!\\1' +
    LIST_BULLET +
    ' )\\n*' +
    // the \\s*$ here is so that we can parse the inside of nested
    // lists, where our content might end before we receive two `\n`s
    '|\\s*\n*$)'
);
const LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;

export const list = extend(
  {
    match: function (source, state) {
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

      if (isStartOfLineCapture && allowList) {
        source = isStartOfLineCapture[1] + source;
        return LIST_R.exec(source);
      } else {
        return null;
      }
    },
    parse: function (capture, parse, state) {
      const listDepth = state.inList;
      const disallowBlock = state.disallowBlock;
      state.disallowBlock = true;
      state.listDepth = (state.listDepth ?? 0) + 1;
      const bullet = capture[2];
      const ordered = bullet.length > 1;
      const start = ordered ? +bullet : undefined;
      const items = /** @type {string[]} */ capture[0].replace(LIST_BLOCK_END_R, '\n').match(LIST_ITEM_R)!;

      // We know this will match here, because of how the regexes are
      // defined
      /*:: items = ((items : any) : Array<string>) */

      let lastItemWasAParagraph = false;
      const itemContent = items.map(function (/** @type {string} */ item: string, /** @type {number} */ i: number) {
        // We need to see how far indented this item is:
        const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
        const space = prefixCapture ? prefixCapture[0].length : 0;
        // And then we construct a regex to "unindent" the subsequent
        // lines of the items by that amount:
        const spaceRegex = new RegExp('^ {1,' + space + '}', 'gm');

        // Before processing the item, we need a couple things
        const content = item
          // remove indents on trailing lines:
          .replace(spaceRegex, '')
          // remove the bullet:
          .replace(LIST_ITEM_PREFIX_R, '');

        // I'm not sur4 why this is necessary again?
        /*:: items = ((items : any) : Array<string>) */

        // Handling "loose" lists, like:
        //
        //  * this is wrapped in a paragraph
        //
        //  * as is this
        //
        //  * as is this
        const isLastItem = i === items.length - 1;
        const containsBlocks = content.indexOf('\n\n') !== -1;

        // Any element in a list is a block if it contains multiple
        // newlines. The last element in the list can also be a block
        // if the previous item in the list was a block (this is
        // because non-last items in the list can end with \n\n, but
        // the last item can't, so we just "inherit" this property
        // from our previous element).
        const thisItemIsAParagraph = containsBlocks || (isLastItem && lastItemWasAParagraph);
        lastItemWasAParagraph = thisItemIsAParagraph;

        // Parse inline if we're in a tight list, or block if we're in
        // a loose list.
        let adjustedContent;
        if (thisItemIsAParagraph) {
          adjustedContent = content.replace(LIST_ITEM_END_R, '\n\n');
        } else {
          adjustedContent = content.replace(LIST_ITEM_END_R, '');
        }

        const result = parse(adjustedContent, state);

        return result;
      });

      state.disallowBlock = disallowBlock;
      state.listDepth = listDepth;
      return {
        ordered: ordered,
        start: start,
        items: itemContent,
      };
    },
  },
  SimpleMarkdown.defaultRules.list
);

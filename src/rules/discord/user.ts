import SimpleMarkdown from 'simple-markdown';

export const user: SimpleMarkdown.ParserRule = {
    order: SimpleMarkdown.defaultRules.strong.order,
    match: source => /^<@!?([0-9]*)>/.exec(source),
    parse: function(capture) {
        return {
            id: capture[1],
            type: 'user'
        };
    }
}
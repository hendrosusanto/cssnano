import postcss from 'postcss';
import nano from '..';
import {readFileSync as file} from 'fs';
import {join} from 'path';
import ava from 'ava';

ava('it should compress whitespace after node.clone()', t => {
    var fixture = file(join(__dirname, 'issue26.css'), 'utf-8');
    var expected = file(join(__dirname, 'issue26.expected.css'), 'utf-8');

    var processor = postcss([
        postcss.plugin('cloner', () => {
            return css => {
                css.walkAtRules(rule => {
                    css.prepend(rule.clone());
                    rule.remove();
                });
            };
        }),
        nano()
    ]);

    return processor.process(fixture).then(r => t.same(r.css, expected));
});

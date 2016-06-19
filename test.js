/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module remark-rehype
 * @fileoverview Test suite for `remark-rehype`.
 */

'use strict';

/* eslint-env node */
/* jscs:disable jsDoc */
/* jscs:disable maximumLineLength */

/* Dependencies. */
var test = require('tape');
var unified = require('unified');
var parse = require('remark-parse');
var remark2rehype = require('./index.js');
var markdown = require('remark-stringify');
var html = require('rehype-stringify');

/* Tests. */
test('remark2rehype()', function (t) {
    t.equal(
        unified()
            .use(parse)
            .use(remark2rehype)
            .use(html)
            .process('## Hello, world! ##')
            .toString(),
        '<h2>Hello, world!</h2>',
        'should mutate'
    );

    t.equal(
        unified()
            .use(parse)
            .use(remark2rehype, unified())
            .use(markdown)
            .process('## Hello, world! ##')
            .toString(),
        '## Hello, world!\n',
        'should bridge'
    );

    t.end();
});

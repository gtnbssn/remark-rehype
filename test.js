'use strict';

var test = require('tape');
var unified = require('unified');
var parse = require('remark-parse');
var markdown = require('remark-stringify');
var html = require('rehype-stringify');
var remark2rehype = require('./index.js');

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
      .use(remark2rehype, {allowDangerousHTML: true})
      .use(html, {allowDangerousHTML: true})
      .process('## Hello, <i>world</i>! ##')
      .toString(),
    '<h2>Hello, <i>world</i>!</h2>',
    'should mutate with options'
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

  t.equal(
    unified()
      .use(parse)
      .use(remark2rehype, unified(), {allowDangerousHTML: true})
      .use(markdown)
      .process('## Hello, <i>world</i>! ##')
      .toString(),
    '## Hello, <i>world</i>!\n',
    'should bridge with options'
  );

  t.end();
});

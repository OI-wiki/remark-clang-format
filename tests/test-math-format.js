import * as fs from 'fs/promises';

import test from 'ava';
import rehypeFormat from 'rehype-format';
import rehypeMathJax from 'rehype-mathjax';
import rehypeStringify from 'rehype-stringify';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import formatMath from '../math/format-math.js';

async function TestInputFile(filename) {
  return test(`${filename}`, async (assert) => {
    const input = await fs.readFile(`tests/resources/latex/${filename}`);

    const baseProcessor = unified().use(remarkParse).use(remarkMath);

    const expected = await baseProcessor()
      .use(remarkRehype)
      .use(rehypeMathJax)
      .use(rehypeFormat) // we are outputting diffs
      .use(rehypeStringify)
      .process(input);

    const formatted = await baseProcessor()
      .use(() => formatMath)
      .use(remarkRehype)
      .use(rehypeMathJax)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(input);

    assert.is(formatted.value, expected.value);
  });
}

TestInputFile('basic_inline.md');
TestInputFile('basic_display.md');
TestInputFile('matrix.md');

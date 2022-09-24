/*
Copyright (c) 2022 Michael Brade, Jason Siefken, McEndu.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { unified } from 'unified';
import { unifiedLatexFromString } from '@unified-latex/unified-latex-util-parse';
import { printLatexAst } from '@unified-latex/unified-latex-prettier';

const languages = [
  {
    name: 'latex-math',
    parsers: ['unified-latex-math'],
  },
];

const parse = unified()
  .use(unifiedLatexFromString, { mode: 'math' })
  .freeze().parse;

const parsers = {
  'unified-latex-math': {
    parse,
    astFormat: 'latex-ast',
    locStart: (node) => (node.position ? node.position.start.offset : 0),
    locEnd: (node) => (node.position ? node.position.end.offset : 1),
  },
};

const printers = {
  'latex-ast': {
    print: printLatexAst,
  },
};

const prettierPluginLatexMath = { languages, parsers, printers };

export { prettierPluginLatexMath };

import test from 'ava';
import { promises } from 'fs';
import { remark } from 'remark';
import remarkMath from 'remark-math';

import remarkCodeFormat from '../index.js';

async function T(num) {
  test(`format file #${num}`, async (t) => {
    const infile = await promises.readFile(`tests/resources/code/${num}.in.md`);
    const outfile = await promises.readFile(
      `tests/resources/code/${num}.out.md`,
    );
    remark()
      .use(remarkMath)
      .use(remarkCodeFormat)
      .process(infile, function (err, res) {
        t.is(String(res), String(outfile));
      });
  });
}

T(1);
T(2);
T(3);
T(4);

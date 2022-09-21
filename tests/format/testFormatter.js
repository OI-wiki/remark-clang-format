import test from 'ava';
import { promises } from 'fs';
import remark from 'remark';

import de from '../../index.js';

async function T(num) {
  test(`format file #${num}`, async (t) => {
    const infile = await promises.readFile(`tests/format/${num}.in.md`);
    const outfile = await promises.readFile(`tests/format/${num}.out.md`);
    remark()
      .use(de)
      .process(infile, function (err, res) {
        t.is(String(res), String(outfile));
      });
  });
}

T(1);
T(2);
T(3);

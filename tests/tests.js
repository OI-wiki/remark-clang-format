const test = require('ava');

const remark = require('remark');

const fs = require('fs');
const de = require('../index');

const in_1 = fs.readFileSync('tests/1.in.md');
const out_1 = fs.readFileSync('tests/1.out.md');

test('main', (t) => {
  remark()
    .use(de)
    .process(in_1, function (err, res) {
      t.is(String(res), String(out_1));
    });
});

'use strict';

import formatCode from './code/format-code.js';
import formatMath from './math/format-math.js';

export default function remarkCodeFormat() {
  return function transformer(tree) {
    formatCode(tree);
    formatMath(tree);
  };
}

'use strict';

import formatCode from './code/format-code.js';
import formatMath from './math/format-math.js';

export default function remarkCodeFormat(options) {
  return function transformer(tree) {
    formatCode(tree);
    if (options && options.math) {
      formatMath(tree);
    }
  };
}

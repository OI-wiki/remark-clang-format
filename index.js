'use strict';

import { visit } from 'unist-util-visit';
import { spawnSync as spawnSync } from 'child_process';

function visitor(node) {
  if (node.type == 'code' || node.type == 'inlineCode') {
  // if (node.type == 'inlineCode') {
    if (
      node.lang &&
      (node.lang.toLowerCase() == 'c++' ||
        node.lang.toLowerCase() == 'cpp' ||
        node.lang.toLowerCase() == 'c') &&
      (!node.meta || !node.meta.includes('nolint')) &&
      (node.value && (!node.value.includes('--8<--')))
    ) {
      const child = spawnSync('clang-format', { input: node.value });
      if (child.stderr) {
        console.warn("[remark-clang-format] stderr: ", child.stderr);
      }
      if (!child.stdout) {
        console.warn("[remark-clang-format] empty stdout");
        console.warn("[remark-clang-format] original code: ", node.value);
        console.warn("[remark-clang-format] child info", child);
        // node value left untouched
      } else {
        node.value = child.stdout;
      }
    }
  }
}

export default function attacher() {
  return function transformer(tree) {
    visit(tree, visitor);
  };
}

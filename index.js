'use strict';

import { visit } from 'unist-util-visit';
import { spawnSync as spawnSync } from 'child_process';

function visitor(node) {
  if (node.type == 'code' || node.type == 'inlineCode') {
    if (
      node.lang &&
      (node.lang.toLowerCase() == 'c++' ||
        node.lang.toLowerCase() == 'cpp' ||
        node.lang.toLowerCase() == 'c')
    ) {
      const child = spawnSync('clang-format', { input: node.value });
      node.value = child.stdout;
    }
  }
}

export default function attacher() {
  return function transformer(tree) {
    visit(tree, visitor);
  };
}

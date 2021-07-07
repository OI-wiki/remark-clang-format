'use strict';

const visit = require('unist-util-visit');
const spawnSync = require('child_process').spawnSync;

function visitor(node) {
  if (node.type == 'code' || node.type == 'inlineCode') {
    if (
      node.lang &&
      (node.lang.toLowerCase() == 'c++' || node.lang.toLowerCase() == 'cpp')
    ) {
      const child = spawnSync('clang-format', { input: node.value });
      node.value = child.stdout;
    }
  }
}

module.exports = function attacher() {
  return function transformer(tree) {
    visit(tree, visitor);
  };
};

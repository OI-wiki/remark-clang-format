'use strict';

var visit = require('unist-util-visit');
// var fs = require("fs");
var spawnSync = require('child_process').spawnSync;

function visitor(node) {
  if (node.type == 'code' || node.type == 'inlineCode') {
    // if (node.type == 'inlineCode') {
    if (
      node.lang &&
      (node.lang.toLowerCase() == 'c++' ||
        node.lang.toLowerCase() == 'cpp' ||
        node.lang.toLowerCase() == 'c') &&
      (!node.meta || !node.meta.includes('nolint')) &&
      node.value &&
      !node.value.includes('--8<--')
    ) {
      const child = spawnSync('clang-format', { input: node.value });
      if (child.stderr) {
        console.warn('[remark-clang-format] stderr: ', child.stderr);
      }
      if (!child.stdout) {
        console.warn('[remark-clang-format] empty stdout');
        console.warn('code: ', node.value);
      } else {
        node.value = child.stdout;
      }
    }
  }
}

module.exports = function attacher() {
  return function transformer(tree) {
    visit(tree, visitor);
  };
};

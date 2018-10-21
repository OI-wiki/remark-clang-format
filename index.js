bin/linux_x64/clang-format

'use strict'

var visit = require('unist-util-visit')
var fs = require('fs')
spawn = require('child_process').spawn

function getNativeBinary() {
  let nativeBinary;

  if (os.platform() === 'win32') {
    nativeBinary = path.join(`${__dirname}`, `../clang-format/bin/win32/clang-format.exe`);
  } else {
    nativeBinary = path.join(`${__dirname}`, `../clang-format/bin/${os.platform()}_${os.arch()}/clang-format`);
  }

  if (!fs.existsSync(nativeBinary)) {
    const message = 'This module doesn\'t bundle the clang-format executable for your platform. ' +
      `(${os.platform()}_${os.arch()})\n` +
      'Consider installing it with your native package manager instead.\n';
    throw new Error(message);
  }
  return nativeBinary;
}


function visitor(node) {
  let nativeBinary = getNativeBinary()
  if (node.type == 'code' || node.type == 'inlineCode') {
    if (node.lang.toLowerCase() == 'c++' || node.lang.toLowerCase() == 'cpp') {
      var child = spawnSync(nativeBinary);

      child.stdin.setEncoding('utf-8');
      child.stdout.pipe(process.stdout);

      child.stdin.write(node.value);

      child.stdin.end();

      node.value = format(child.stdout)
    }
  }
}

module.exports = function attacher() {
  return function transformer(tree, file) {
    visit(tree, visitor)
  }
}

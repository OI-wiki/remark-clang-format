import { visit, CONTINUE } from 'unist-util-visit';
import { format } from 'prettier';
import { prettierPluginLatexMath } from './prettier-plugin-latex-math.js';

function visitor(node) {
  node.value = format(node.value, {
    plugins: [prettierPluginLatexMath],
    parser: 'unified-latex-math',
  });
  return CONTINUE;
}

export default function formatMath() {
  return function transformer(tree) {
    visit(tree, ['math', 'inlineMath'], visitor);
  };
}

import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root, Heading } from 'mdast'

/**
 * Remark plugin to shift all heading levels down by one
 * (h1 -> h2, h2 -> h3, etc.) to ensure only one h1 per page
 */
export const remarkShiftHeadings: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'heading', (node: Heading) => {
      // Shift heading level down by 1, but cap at h6
      if (node.depth < 6) {
        node.depth = (node.depth + 1) as Heading['depth']
      }
    })
  }
}

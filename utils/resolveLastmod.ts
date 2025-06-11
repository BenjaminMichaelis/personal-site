import { getGitLastModifiedDate } from './getGitLastModifiedDate'
import path from 'path'

/**
 * Resolves the lastmod date for a blog post using git, or falls back to frontmatter or date.
 * @param doc Contentlayer doc object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveLastmod(doc: any): string {
  // Try git lastmod
  const absPath = path.resolve(process.cwd(), 'data', doc._raw.sourceFilePath)
  const gitDate = getGitLastModifiedDate(absPath)
  if (gitDate) return gitDate
  // Fallback to frontmatter lastmod or date
  return doc.lastmod || doc.date
}

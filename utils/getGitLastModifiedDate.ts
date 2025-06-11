import { execSync } from 'child_process'
import { resolve } from 'path'

/**
 * Returns the last git commit date (ISO string) for a file.
 * @param filePath Absolute or relative path to the file
 */
export function getGitLastModifiedDate(filePath: string): string | null {
  try {
    const absPath = resolve(filePath)
    const result = execSync(`git log -1 --format="%cI" -- "${absPath}"`, { encoding: 'utf-8' })
    return result.trim()
  } catch (e) {
    return null
  }
}

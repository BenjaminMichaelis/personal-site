#!/usr/bin/env node

import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { spawn } from 'child_process'

const linkRegex = /\[([^\]]+)\]\(\.\/([^)]+)\)/g

class ValidationError extends Error {
  constructor(message, file, line) {
    super(message)
    this.file = file
    this.line = line
  }
}

async function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(new Error(`Command failed with exit code ${code}: ${command} ${args.join(' ')}`))
      }
    })

    child.on('error', (error) => {
      reject(error)
    })
  })
}

function validateInternalLinks() {
  console.log('🔗 Validating internal links...')

  const errors = []
  const existingSlugs = new Set(allBlogs.map((blog) => blog.slug))

  console.log(`📝 Found ${allBlogs.length} published blog posts`)

  for (const blog of allBlogs) {
    if (blog.draft) continue // Skip draft posts

    try {
      const filePath = join(process.cwd(), 'data', blog._raw.sourceFilePath)
      const content = readFileSync(filePath, 'utf-8')

      let match
      while ((match = linkRegex.exec(content)) !== null) {
        const [fullMatch, linkText, linkedSlug] = match

        if (!existingSlugs.has(linkedSlug)) {
          const line = content.substring(0, match.index).split('\n').length
          errors.push(
            new ValidationError(
              `Broken internal link: "${linkText}" → ./${linkedSlug}`,
              blog._raw.sourceFileName,
              line
            )
          )
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not read file for ${blog.slug}: ${error.message}`)
    }
  }

  if (errors.length > 0) {
    console.error('❌ Found broken internal links:')
    errors.forEach((error) => {
      console.error(`  📄 ${error.file}:${error.line} - ${error.message}`)
    })
    throw new Error(`Found ${errors.length} broken internal link(s)`)
  }

  console.log('✅ All internal links are valid!')
}

function validateBlogPostStructure() {
  console.log('📄 Validating blog post structure...')

  const errors = []

  for (const blog of allBlogs) {
    if (blog.draft) continue

    // Check required frontmatter fields
    if (!blog.title || blog.title.trim() === '') {
      errors.push(new ValidationError(`Missing or empty title`, blog._raw.sourceFileName, 1))
    }

    if (!blog.date) {
      errors.push(new ValidationError(`Missing date`, blog._raw.sourceFileName, 1))
    }

    if (!blog.summary || blog.summary.trim() === '') {
      errors.push(new ValidationError(`Missing or empty summary`, blog._raw.sourceFileName, 1))
    }

    if (!blog.tags || blog.tags.length === 0) {
      errors.push(new ValidationError(`Missing tags`, blog._raw.sourceFileName, 1))
    }

    // Check if the file actually exists
    const filePath = join(process.cwd(), 'data', blog._raw.sourceFilePath)
    if (!existsSync(filePath)) {
      errors.push(new ValidationError(`File does not exist`, blog._raw.sourceFileName, 1))
    }
  }

  if (errors.length > 0) {
    console.error('❌ Found blog post structure issues:')
    errors.forEach((error) => {
      console.error(`  📄 ${error.file}:${error.line} - ${error.message}`)
    })
    throw new Error(`Found ${errors.length} blog post structure issue(s)`)
  }

  console.log('✅ All blog posts have valid structure!')
}

async function runLinting() {
  console.log('🧹 Running ESLint...')
  try {
    await runCommand('npm', ['run', 'lint'])
    console.log('✅ Linting passed!')
  } catch (error) {
    console.error('❌ Linting failed!')
    throw error
  }
}

async function runTypeChecking() {
  console.log('🏗️  Running TypeScript type checking...')
  try {
    await runCommand('npx', ['tsc', '--noEmit'])
    console.log('✅ Type checking passed!')
  } catch (error) {
    console.error('❌ Type checking failed!')
    throw error
  }
}

async function testBuild() {
  console.log('🏗️  Testing build...')
  try {
    // Temporarily remove prebuild to avoid circular dependency
    await runCommand('cross-env', ['INIT_CWD=$PWD', 'next', 'build'])
    console.log('✅ Build test passed!')
  } catch (error) {
    console.error('❌ Build test failed!')
    throw error
  }
}

async function main() {
  const args = process.argv.slice(2)
  const isCI = process.env.CI === 'true'
  const isPR = process.env.GITHUB_EVENT_NAME === 'pull_request'

  console.log('🚀 Running validation pipeline...')
  console.log(`Environment: ${isCI ? 'CI' : 'Local'}`)

  const validations = []

  // Always run these
  if (args.length === 0 || args.includes('structure')) {
    validations.push(() => validateBlogPostStructure())
  }

  if (args.length === 0 || args.includes('links')) {
    validations.push(() => validateInternalLinks())
  }

  if (args.length === 0 || args.includes('lint')) {
    validations.push(() => runLinting())
  }

  if (args.length === 0 || args.includes('types')) {
    validations.push(() => runTypeChecking())
  }

  // Only run build test in CI or when explicitly requested
  if (args.includes('build') || (isCI && !isPR)) {
    validations.push(() => testBuild())
  }

  let failedValidations = 0

  for (const validation of validations) {
    try {
      await validation()
    } catch (error) {
      console.error(`\n${error.message}\n`)
      failedValidations++
    }
  }

  if (failedValidations > 0) {
    console.error(`\n❌ ${failedValidations} validation(s) failed!`)
    process.exit(1)
  } else {
    console.log('\n🎉 All validations passed!')
  }
}

main().catch((error) => {
  console.error('💥 Validation pipeline crashed:', error)
  process.exit(1)
})

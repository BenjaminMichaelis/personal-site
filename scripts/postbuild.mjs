import rss from './rss.mjs'
import fs from 'fs'
import path from 'path'

/**
 * Generate IndexNow key file
 */
function generateIndexNowKey() {
  const key = process.env.INDEXNOW_KEY

  if (!key) {
    console.log('⚠️ INDEXNOW_KEY environment variable not set, skipping key file generation')
    return
  }

  const keyFileName = `${key}.txt`
  const keyFilePath = path.join(process.cwd(), 'public', keyFileName)

  try {
    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Write the key file
    fs.writeFileSync(keyFilePath, key, 'utf8')

    console.log(`✅ IndexNow key file generated: ${keyFileName}`)
    console.log(`   Will be accessible at: https://benjamin.michaelis.net/${keyFileName}`)
  } catch (error) {
    console.error('❌ Error generating IndexNow key file:', error.message)
    process.exit(1)
  }
}

async function postbuild() {
  console.log('📦 Running post-build tasks...')

  // Generate RSS feed
  await rss()

  // Generate IndexNow key file
  generateIndexNowKey()

  console.log('✅ Post-build tasks completed!')
}

postbuild()

import { access, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import c from 'picocolors'

const ROOT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..')

async function createWalletsFile() {
  const walletsPath = join(ROOT_DIR, 'wallets.js')
  try {
    await access(walletsPath)
  } catch {
    console.log(c.green('Created wallets.js'))
    await writeFile(
      walletsPath,
      `export default [
  {
    privateKey: '',
    address: '',
  },
]
`
    )
  }
}

createWalletsFile()

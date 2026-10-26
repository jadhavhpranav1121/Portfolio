// Reads every Markdown file in content/ and writes lib/content.generated.json,
// the default content the site is built with. Runs before `dev` and `build`;
// `pnpm content --watch` rebuilds on every save.
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, watch, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { contentFromMarkdown } from '../lib/content-md.ts'

const root = join(import.meta.dirname, '..')
const dir = join(root, 'content')
const out = join(root, 'lib', 'content.generated.json')

function build() {
  const files = readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ name: f.replaceAll('\\', '/'), text: readFileSync(join(dir, f), 'utf8') }))
  const content = contentFromMarkdown(files)
  // The version changes whenever the Markdown does. Live edits from /admin are
  // stamped with the version they were made on, so a newer Markdown build wins.
  const version = createHash('sha256').update(JSON.stringify(content)).digest('hex').slice(0, 12)
  writeFileSync(out, JSON.stringify({ version, content }, null, 2) + '\n')
  console.log(`[content] ${files.length} files → ${relative(root, out)}`)
}

build()

if (process.argv.includes('--watch')) {
  watch(dir, { recursive: true }, () => {
    try {
      build()
    } catch (e) {
      console.error('[content]', e instanceof Error ? e.message : e)
    }
  })
}

import { cli } from 'gunshi'
import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const command = {
  name: 'new',
  description: 'Create a new Zenn article with images directory',
  args: {
    slug: {
      type: 'positional',
      description: 'Article slug (required)',
      required: true,
    },
  },
  run: (ctx) => {
    const { slug } = ctx.values

    // Create article using zenn-cli
    console.log(`Creating article: ${slug}`)
    execSync(`zenn new:article --slug ${slug}`, { stdio: 'inherit' })

    // Create images directory with .gitkeep
    const imagesDir = join(process.cwd(), 'images', slug)
    mkdirSync(imagesDir, { recursive: true })
    writeFileSync(join(imagesDir, '.gitkeep'), '')
    console.log(`Created images directory: images/${slug}/`)
  },
}

await cli(process.argv.slice(2), command, {
  name: 'new',
  version: '1.0.0',
  description: 'Create a new Zenn article with images directory',
})

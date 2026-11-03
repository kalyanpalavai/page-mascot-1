import { readFileSync, renameSync, rmdirSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { MASCOT } from './site/mascots'

// Builds only the home page, served from the root of your own domain.
// The demo build (vite.config.ts) is separate and untouched.

// public/ holds every mascot the demo shows; the home page needs only its own two
// sheets and the favicon, so copy just those instead of the whole folder.
const PUBLIC_FILES = [
  'favicon.png',
  `mascots/${MASCOT}-directions.webp`,
  `mascots/${MASCOT}-reactions.webp`,
]

function homeAtRoot(): Plugin {
  return {
    name: 'home-at-root',
    apply: 'build',
    generateBundle() {
      for (const file of PUBLIC_FILES) {
        this.emitFile({ type: 'asset', fileName: file, source: readFileSync(`public/${file}`) })
      }
    },
    writeBundle(options) {
      // Serve home-page/index.html as the site's index.html. Asset URLs are absolute,
      // so moving the file up a level does not break them.
      renameSync(`${options.dir}/home-page/index.html`, `${options.dir}/index.html`)
      rmdirSync(`${options.dir}/home-page`)
    },
  }
}

export default defineConfig({
  base: '/',
  publicDir: false,
  plugins: [react(), tailwindcss(), homeAtRoot()],
  build: {
    outDir: 'site-build-home',
    emptyOutDir: true,
    rollupOptions: { input: 'home-page/index.html' },
  },
})

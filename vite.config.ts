import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The home page, served from the root of the domain. dist/ is the published component,
// so the site builds somewhere else.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { outDir: 'site-build-home', emptyOutDir: true },
  server: { open: true },
})

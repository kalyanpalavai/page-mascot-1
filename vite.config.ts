import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const GA_MEASUREMENT_ID = 'G-F39XL66190'

// Same GA property as the other koboyo.com sites. Injected only on build so a dev
// server never sends hits.
function analytics(): Plugin {
  return {
    name: 'analytics',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}` },
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: [
            'window.dataLayer = window.dataLayer || [];',
            'function gtag(){dataLayer.push(arguments);}',
            "gtag('js', new Date());",
            `gtag('config', '${GA_MEASUREMENT_ID}');`,
          ].join('\n'),
          injectTo: 'head',
        },
      ]
    },
  }
}

// In dev, the site root redirects to the home page route.
function homeAsRoot(): Plugin {
  return {
    name: 'home-as-root',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url ?? '').split('?')[0]
        if (path === '/' || path === '/page-mascot' || path === '/page-mascot/') {
          res.statusCode = 302
          res.setHeader('Location', '/page-mascot/home-page')
          res.end()
          return
        }
        if (path === '/page-mascot/home-page') req.url = '/page-mascot/home-page/index.html'
        next()
      })
    },
  }
}

export default defineConfig({
  // The demo is served from koboyo.com/page-mascot.
  base: '/page-mascot/',
  plugins: [react(), tailwindcss(), analytics(), homeAsRoot()],
  // dist/ is the published component, so the demo builds somewhere else.
  build: {
    outDir: 'site-build/page-mascot',
    rollupOptions: { input: { main: 'index.html', home: 'home-page/index.html' } },
  },
  // `npm run dev` opens on the home page.
  server: { open: '/page-mascot/home-page' },
})

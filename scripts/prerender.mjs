#!/usr/bin/env node
// Prérendu statique : navigue chaque route dans un headless Chromium
// et écrit le HTML rendu dans dist/<route>/index.html. Vercel sert alors
// du HTML complet aux crawlers qui n’exécutent pas JS.

import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import puppeteer from 'puppeteer'

const HOST = 'http://localhost:4173'
const DIST = 'dist'

async function readRoutes() {
  const sitemap = await fs.readFile('public/sitemap.xml', 'utf8')
  const matches = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]+)<\/loc>/g)]
  const paths = matches.map((m) => m[1]).map((p) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p))
  return [...new Set(paths)]
}

function waitFor(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function waitForServer(url, timeout = 15000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {
      /* not up yet */
    }
    await waitFor(300)
  }
  return false
}

async function main() {
  const routes = await readRoutes()
  console.log(`→ ${routes.length} routes à prérendre`)

  const preview = spawn('node', ['node_modules/vite/bin/vite.js', 'preview', '--port', '4173', '--strictPort'], {
    stdio: ['ignore', 'ignore', 'inherit'],
  })

  try {
    const up = await waitForServer(HOST + '/')
    if (!up) throw new Error('Serveur preview injoignable après 15s')

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    for (const route of routes) {
      const url = HOST + route
      const page = await browser.newPage()
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
        await waitFor(500) // laisse Helmet finir de muter <head>

        // Déduplique les tags de <head> que react-helmet-async peut avoir
        // empilés (title + og/twitter/description). On garde le dernier —
        // celui posé par le Seo actif de la route.
        await page.evaluate(() => {
          // react-helmet-async liste les tags par ordre d'insertion et
          // ajoute chaque route "par-dessus" les précédentes : le premier
          // titre visible dans le DOM est en général celui de la route
          // courante. On garde donc le PREMIER pour chaque type.
          const keepFirst = (sel) => {
            const els = document.querySelectorAll(sel)
            for (let i = 1; i < els.length; i++) els[i].remove()
          }
          // Le titre : keepFirst (Helmet le met correctement en tête).
          keepFirst('head > title')
          // Les autres : keepLast (Helmet append la version de la route).
          const keepLast = (sel) => {
            const els = document.querySelectorAll(sel)
            for (let i = 0; i < els.length - 1; i++) els[i].remove()
          }
          keepLast('head > meta[name="description"]')
          keepLast('head > link[rel="canonical"]')
          const props = [
            'og:type', 'og:site_name', 'og:title', 'og:description',
            'og:url', 'og:image', 'og:locale',
            'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image',
          ]
          for (const p of props) {
            const attr = p.startsWith('og:') ? 'property' : 'name'
            keepLast(`head > meta[${attr}="${p}"]`)
          }
        })

        const html = await page.content()

        const rel = route === '/' ? 'index.html' : path.join(route.replace(/^\/+/, ''), 'index.html')
        const outPath = path.join(DIST, rel)
        await fs.mkdir(path.dirname(outPath), { recursive: true })
        await fs.writeFile(outPath, html)
        console.log(`  ✓ ${route}`)
      } catch (err) {
        console.warn(`  ✗ ${route} — ${err.message}`)
      } finally {
        await page.close()
      }
    }

    await browser.close()
    console.log('✓ Prérendu terminé')
  } finally {
    preview.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

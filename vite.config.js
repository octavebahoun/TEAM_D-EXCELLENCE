import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Custom dev server middleware to read/write JSON files locally in dev mode
const cmsPlugin = () => ({
  name: 'cms-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Intercept /api/cms requests
      if (req.url.startsWith('/api/cms')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        const urlObj = new URL(req.url, 'http://localhost');
        const filename = urlObj.searchParams.get('file');

        if (!filename || !/^[a-zA-Z0-9_\-]+\.json$/.test(filename)) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Fichier JSON invalide demandé.' }));
          return;
        }

        const dataDir = path.resolve(__dirname, 'src/data');
        const filePath = path.join(dataDir, filename);

        if (req.method === 'GET') {
          try {
            const data = fs.readFileSync(filePath, 'utf-8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Fichier non trouvé.' }));
          }
        } else if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              // Validate that the body is correct JSON
              JSON.parse(body);
              fs.writeFileSync(filePath, body, 'utf-8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Fichier mis à jour avec succès.' }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: `Erreur d'écriture : ${err.message}` }));
            }
          });
        }
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    cmsPlugin()
  ],
})

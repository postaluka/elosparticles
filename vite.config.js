import { defineConfig } from 'vite'
//import eslintPlugin from 'vite-plugin-eslint'

// vite.config.js
export default defineConfig({
  //plugins: [eslintPlugin({ cache: false })],
  base: './',
  server: {
    host: '0.0.0.0', // 👈 це дозволяє доступ з інших пристроїв у локальній мережі
    cors: true,
    hmr: {
      host: '192.168.50.208', // можна залишити
      protocol: 'ws',
    },
  },
  publicDir: './static/',
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './index.html',
      output: {
        format: 'es',
        entryFileNames: 'main.js',
        esModule: false,
        compact: true,
      },
    },
  },
})

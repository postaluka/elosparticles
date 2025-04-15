import { defineConfig } from 'vite'
//import eslintPlugin from 'vite-plugin-eslint'

// vite.config.js
export default defineConfig({
  //plugins: [eslintPlugin({ cache: false })],
  base: './',
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
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

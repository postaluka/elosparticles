import { defineConfig } from 'vite'
//import eslintPlugin from 'vite-plugin-eslint'

// vite.config.js
export default defineConfig({
  //plugins: [eslintPlugin({ cache: false })],
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
      input: './src/main.js',
      output: {
        format: 'umd',
        entryFileNames: 'main.js',
        esModule: false,
        compact: true,
      },
    },
  },
})

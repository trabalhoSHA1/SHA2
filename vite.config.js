// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
  build: {
    cssMinify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'features': path.resolve(__dirname, './src/features'),
      'components': path.resolve(__dirname, './src/components'),
      'context': path.resolve(__dirname, './src/context'),
      'pages': path.resolve(__dirname, './src/pages'),
    },
  },
})
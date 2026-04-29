import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()],
  server: {
    proxy: {
      '/blogs': 'https://api.alexander-kessler.com',
      '/upload': 'https://api.alexander-kessler.com',
      '/users': 'https://api.alexander-kessler.com',
    },
  },
})

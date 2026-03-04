import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()],
  server: {
    proxy: {
      '/blogs': 'http://localhost:3001',
      '/upload': 'http://localhost:3001',
      '/users': 'http://localhost:3001',
    },
  },
})

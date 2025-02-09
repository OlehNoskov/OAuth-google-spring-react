import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite documentation https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})

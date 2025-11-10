import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Vite documentation https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env files
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      // This port was configured in Google Cloud for consistency
      port: 3000,
      proxy: {
        // Add proxying so we can avoid CORS issues for Elastic Search requests
        '/search': {
          target: env.VITE_ELASTIC_SEARCH_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/search/, '/tree/_search'),
        },
      },
    },
  }
})

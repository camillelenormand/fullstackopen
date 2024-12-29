import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configure proxy for GraphQL endpoint
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000', // Your GraphQL server URL
        changeOrigin: true,
        secure: false,
        ws: true // Enable WebSocket for subscriptions
      }
    },
    port: 3000, // Frontend port
    open: true, // Auto-open browser
    cors: true // Enable CORS
  },
})

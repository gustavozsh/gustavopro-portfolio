import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This allows importing markdown files as raw text
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': '/src',
      '@posts': '/posts',
      '@images': '/public/images'
    }
  }
})

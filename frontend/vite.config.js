import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //everything we use /api, it puts http://localhost:5000 before it
    //this way we dont need to type out the localhose everytime
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})

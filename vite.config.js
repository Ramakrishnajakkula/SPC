import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/SPC/",
  server: {
    port: 5173,    
  },
  proxy: {
    '/api': {
      target: 'https://spc-backend-two.vercel.app/',
      changeOrigin: true,
      secure: false,
    },
  },
  
})

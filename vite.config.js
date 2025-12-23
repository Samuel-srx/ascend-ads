import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ou host: '0.0.0.0' para escutar em todas as interfaces
    port: 5173, // a porta que você está usando
  },
})
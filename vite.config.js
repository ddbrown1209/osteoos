import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: base is auto-set by the GitHub Actions workflow (project pages vs user pages)
  base: process.env.VITE_BASE ?? '/',
})

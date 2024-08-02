import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '/api/expense-manager/src/main/resources/static',
    emptyOutDir: true,
  },
});
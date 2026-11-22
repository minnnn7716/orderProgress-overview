import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // React Compiler，開啟後會自動化 memorialize
          // ["babel-plugin-react-compiler", { target: '18' }],
        ],
      },
    }),
  ],
  base: './',
  resolve: {
    alias: {
      src: "/src"
    }
  },
  build: {
    chunkSizeWarningLimit: 800,
  },
})

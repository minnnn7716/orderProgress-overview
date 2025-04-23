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
  // 符合 EIP 站台的路徑設定
  base: '/Content/React/Epicor/OrderProgress',
  resolve: {
    alias: {
      src: "/src"
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
  },
})

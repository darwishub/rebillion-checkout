import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { resolve } from 'path';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
const pathSrc = path.resolve(__dirname, "./src");

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
  ],
  resolve: {
    alias: {
        "@": path.resolve(__dirname, "./src"),
    }
  },
})

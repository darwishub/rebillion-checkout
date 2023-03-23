import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'


export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
  ],
  resolve: {
    alias: {
        "@": resolve(__dirname, "./src"),
    }
},
})

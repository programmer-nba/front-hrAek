import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA(
      { 
        registerType: 'autoUpdate',
      }
    )
  ],
  serviceWorker: {
    src: './service-worker.js',
    // Other service worker options...
  },
  
})

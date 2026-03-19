import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',           // Accept semua IP
    port: 3000,
    strictPort: true,    
    cors:true,      // Ganti port jika sudah dipakai
    open: false,                // Jangan auto-open di Termux
    hmr: {
      protocol: 'http',
      host: 'localhost',        // Ganti dengan IP device jika akses dari device lain
      port: 3000
    }
  }
})
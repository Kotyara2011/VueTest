import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // Явное указание расширений файлов для импорта
    extensions: ['.js', '.jsx', '.vue', '.json', '.mjs']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Решаем проблему с axios и другими внешними зависимостями
      external: [],
      output: {
        // Оптимальные настройки для Vercel
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['axios'] // Явно указываем axios для оптимизации
  }
});
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url'; // Для корректных путей

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // Алиас для `src/`
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Очищать папку при сборке
    rollupOptions: {
      input: './index.html' // Явное указание на входной файл
    }
  },
  server: {
    port: 3000, // Порт для dev-сервера
    open: true  // Автооткрытие в браузере
  }
});
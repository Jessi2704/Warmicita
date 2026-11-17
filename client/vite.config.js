import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Reutiliza las imágenes de ../assets (se sirven en la raíz: /copa_menstrual.jpg)
  publicDir: '../assets',
  server: {
    port: 5173,
    // En desarrollo, las llamadas a /api van al servidor Express
    proxy: { '/api': 'http://localhost:3000' },
  },
});

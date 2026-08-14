import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Relative base path ensures assets load on GitHub Pages subpaths
  server: {
    host: true,
    port: 3000,
    open: false
  }
});

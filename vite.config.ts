import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // In development, serve from root '/' so http://localhost:3000/ works seamlessly.
  // In production, serve from '/ionic-react-youtube-showcase/' for GitHub Pages.
  base: mode === 'production' ? '/ionic-react-youtube-showcase/' : '/',
  server: {
    host: true,
    port: 3000,
    open: false
  }
}));

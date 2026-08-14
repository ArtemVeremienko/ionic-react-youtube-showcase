import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ionic-react-youtube-showcase/',
  server: {
    host: true,
    port: 3000,
    open: false
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  root: '.',
  build: {
    manifest: true, // ✅ generate manifest.json for automatic loading
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
    },
  },
});
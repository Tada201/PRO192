import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    mdx(), // Re-enable MDX support for Vite
  ],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  server: {
    allowedHosts: ['devserver-main--pro192web.netlify.app'],
  },
});

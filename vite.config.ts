import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'Org_code/images/*',
          dest: 'images',
        },
        {
          src: 'Org_code/resource/*',
          dest: 'resource',
        },
        {
          src: 'Org_code/*.html',
          dest: '',
        },
        {
          src: 'Org_code/*.xlsx',
          dest: '',
        },
      ],
    }),
  ],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  server: {
    allowedHosts: ['devserver-main--pro192web.netlify.app'],
  },
});

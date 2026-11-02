import path from 'path';
import os from 'os';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    cacheDir: path.join(os.tmpdir(), 'nadaun-collective-vite'),
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    // This public portfolio must never embed a server-side Gemini credential.
    // Preserve the existing no-key fallback without requiring Node's process global.
    define: {
      'process.env.API_KEY': JSON.stringify(''),
      'process.env.GEMINI_API_KEY': JSON.stringify(''),
    },
    resolve: {
      alias: { '@': path.resolve(__dirname, '.') },
    },
    build: {
      target: 'esnext',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            const moduleId = id.replaceAll('\\', '/');
            // Keep shared helpers and react-dom/client out of the deferred 3D chunk.
            if (moduleId.includes('commonjsHelpers') || moduleId.includes('vite/preload-helper') || /\/node_modules\/(react|react-dom|scheduler)\//.test(moduleId)) return 'react-vendor';
            if (/\/node_modules\/(three|@react-three|@react-spring)\//.test(moduleId)) return 'three-vendor';
            if (/\/node_modules\/framer-motion\//.test(moduleId)) return 'framer-vendor';
          },
        },
      },
    },
  };
});

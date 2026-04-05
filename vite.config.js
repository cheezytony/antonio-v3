import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      deployment: {
        preset: 'vercel',
      },
    }),
    viteReact(),
    tailwindcss(),
    VitePWA({
      // Workbox generateSW doesn't fire correctly with TanStack Start's Vinxi
      // multi-pass build. We use injectManifest with injectionPoint: undefined
      // so the plugin copies public/sw.js verbatim and still generates
      // manifest.webmanifest. SW registration is handled in __root.tsx.
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',
      injectManifest: {
        injectionPoint: undefined,
      },
      manifest: {
        name: 'Antonio Okoro',
        short_name: 'Antonio',
        description: 'Portfolio of Antonio Okoro — software engineer',
        theme_color: '#f06056',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './'),
    },
  },
});

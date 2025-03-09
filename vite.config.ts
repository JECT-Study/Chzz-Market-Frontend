/// <reference types="vitest" />

import path, { resolve } from 'path';
import { PluginOption, defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import { rimraf } from 'rimraf';

function excludeTestImages(): PluginOption {
  return {
    name: 'exclude-test-images',
    enforce: 'pre',
    load(id: string) {
      if (
        process.env.NODE_ENV === 'production' &&
        id.includes('src/shared/assets/test')
      ) {
        return 'export default ""';
      }
    }
  };
}

const removeMSW = () => ({
  name: 'remove-msw',
  closeBundle: async () => {
    await rimraf(path.join(__dirname, 'dist', 'mockServiceWorker.js'));
  }
});

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                /node_modules\/react(?:\/|$)/.test(id) ||
                /node_modules\/react-dom(?:\/|$)/.test(id) ||
                /node_modules\/react-router(?:\/|$)/.test(id)
              ) {
                return 'react-vendor';
              }

              if (id.includes('axios')) {
                return 'axios-vendor';
              }
              if (id.includes('tough-cookie')) {
                return 'tough-cookie-vendor';
              }
              if (id.includes('zod')) {
                return 'zod-vendor';
              }
            }
          },
          assetFileNames: (assetInfo) => {
            // 폰트 파일 확장자에 해당하면 'fonts' 폴더로 출력
            if (/\.(woff2?|ttf|otf)$/.test(assetInfo.name || '')) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            // 나머지 파일은 기본 assets 폴더에 출력
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    },
    plugins: [react(), removeMSW(), excludeTestImages()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@/app': resolve(__dirname, 'src/app'),
        '@/components': resolve(__dirname, 'src/components'),
        '@/shared': resolve(__dirname, 'src/shared'),
        '@/constants': resolve(__dirname, 'src/constants'),
        '@/mocks': resolve(__dirname, 'src/mocks'),
        '@/pages': resolve(__dirname, 'src/pages'),
        '@/api': resolve(__dirname, 'src/api'),
        '@/utils': resolve(__dirname, 'src/utils'),
        '@/models': resolve(__dirname, 'src/models'),
        '@/store': resolve(__dirname, 'src/store'),
        '@/stories': resolve(__dirname, 'src/stories')
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/shared/api/msw/setupTests.ts'
    }
  };
});

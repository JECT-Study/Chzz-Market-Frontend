/// <reference types="vitest" />

import path, { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { rimraf } from 'rimraf';
import { defineConfig } from 'vite';

const removeMSW = () => ({
  name: 'remove-msw',
  closeBundle: async () => {
    await rimraf(path.join(__dirname, 'dist', 'mockServiceWorker.js'));
  },
});

export default defineConfig({
  plugins: [react(), removeMSW()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/shared/assets': resolve(__dirname, 'src/shared/assets'),
      '@/constants': resolve(__dirname, 'src/constants'),
      '@/mocks': resolve(__dirname, 'src/mocks'),
      '@/pages': resolve(__dirname, 'src/pages'),
      '@/api': resolve(__dirname, 'src/api'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/models': resolve(__dirname, 'src/models'),
      '@/store': resolve(__dirname, 'src/store'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});

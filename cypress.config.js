import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'fc6jx6',
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
    
    },
    viewportWidth: 375,
    viewportHeight: 875,
  },
});

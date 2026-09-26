import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['test-studio/**/*.src.ts'],
    // Polyfill IntersectionObserver for jsdom
    setupFiles: ['./vitest.setup.ts'],
  },
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
    // Several specs call buildTheme() → same dist/theme.css; parallel files race and read truncated CSS.
    fileParallelism: false
  }
});

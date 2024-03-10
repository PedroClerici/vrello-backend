import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
    },
  },
  plugins: [tsconfigPaths()],
});

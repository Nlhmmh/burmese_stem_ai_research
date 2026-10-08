import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const projectRoot = fileURLToPath(new URL("./", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": projectRoot
    }
  },
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.ts", "./tests/integration/setup.ts"],
    include: ["tests/integration/**/*.test.ts"],
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    fileParallelism: false,
    testTimeout: 15_000,
    hookTimeout: 15_000
  }
});

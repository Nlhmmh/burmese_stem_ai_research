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
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      reportsDirectory: "coverage",
      // Application-wide regression floors; retain uncovered runtime files in scope.
      thresholds: { statements: 95, branches: 90, functions: 95, lines: 95 },
      include: [
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "services/**/*.ts",
        "data/**/*.{ts,js}",
        "lib/**/*.ts",
        "i18n/**/*.ts",
        "proxy.ts"
      ]
    }
  }
});

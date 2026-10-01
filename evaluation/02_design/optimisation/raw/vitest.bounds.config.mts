import { fileURLToPath } from "node:url";

const applicationRoot = fileURLToPath(
  new URL("../../../../burmese_stem_ai/", import.meta.url)
);
const evaluationRoot = fileURLToPath(new URL("./", import.meta.url));

export default {
  resolve: {
    alias: {
      "@": applicationRoot
    }
  },
  test: {
    root: applicationRoot,
    environment: "node",
    setupFiles: [
      `${applicationRoot}tests/setup.ts`,
      `${applicationRoot}tests/integration/setup.ts`
    ],
    include: [`${evaluationRoot}BND-RUN-01-bounds.test.ts`],
    clearMocks: true,
    mockReset: false,
    restoreMocks: true,
    fileParallelism: false,
    testTimeout: 20_000,
    hookTimeout: 20_000
  }
};

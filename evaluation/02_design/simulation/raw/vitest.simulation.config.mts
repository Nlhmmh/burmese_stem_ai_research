import { fileURLToPath } from "node:url";
const applicationRoot = fileURLToPath(new URL("../../../../burmese_stem_ai/", import.meta.url));
const evaluationRoot = fileURLToPath(new URL("./", import.meta.url));
export default {
  resolve: { alias: { "@": applicationRoot } },
  test: {
    root: applicationRoot,
    environment: "node",
    setupFiles: [`${applicationRoot}tests/integration/setup.ts`],
    include: [`${evaluationRoot}SIM-RUN-01-simulation.test.ts`],
    fileParallelism: false,
    testTimeout: 3600000,
    hookTimeout: 20000
  }
};

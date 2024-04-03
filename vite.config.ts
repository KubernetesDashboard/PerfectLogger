/// <reference types="vitest" />
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

const external = [/^node:/];

export default defineConfig({
  build: {
    outDir: "build",
    emptyOutDir: true,
    lib: {
      name: "perfect-logger",
      entry: "src/main.ts",
      formats: ["es", "cjs"],
      fileName: format => `perfect-logger.${format}.js`
    },
    rollupOptions: { external }
  },
  plugins: [dtsPlugin({ staticImport: true, insertTypesEntry: true })],
  test: {}
});

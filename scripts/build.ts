import dts from "bun-plugin-dts";

import pkgJson from "../package.json";

await Bun.build({
  entrypoints: ["./src/main.ts"],
  outdir: "./build",
  format: "esm",
  sourcemap: "external",
  target: "node",
  external: [
    ...Object.keys(pkgJson.dependencies || {}),
    ...Object.keys(pkgJson.devDependencies || {})
  ],
  minify: true,
  plugins: [dts()]
});

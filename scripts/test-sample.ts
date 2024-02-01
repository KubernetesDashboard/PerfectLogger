import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

if (process.argv.length < 3) {
  console.error("Usage: ts-node test-sample.ts <name>");
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const name = process.argv[2];
const sample = resolve(__dirname, "../samples", `${name}.ts`);
if (!existsSync(sample)) {
  console.error(`Sample ${name} not found`);
  process.exit(1);
}

(async () => {
  const { test } = await import(sample);
  await test();
})();

import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

import { $ } from "bun";

const samplesDir = resolve(__dirname, "../samples");
const samples = await readdir(samplesDir);

for (const sample of samples) {
  await $`bun run test:sample ${sample.replace(/\.ts$/, "")}`;
  console.log();
}

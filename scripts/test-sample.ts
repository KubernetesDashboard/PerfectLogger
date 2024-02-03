import { existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

if (process.argv.length < 3) {
  console.error("Usage: ts-node test-sample.ts <name>");
  process.exit(1);
}

const testModule = async (sample: string) => {
  const { test } = await import(sample);
  await test();
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const name = process.argv[2];
if (["-a", "--all"].includes(name)) {
  const samples = readdirSync(resolve(__dirname, "../samples"));
  for (const sample of samples) {
    if (sample.endsWith(".ts")) {
      console.log(`Testing ${sample}`);
      await testModule(resolve(__dirname, "../samples", sample));
      console.log(`Sample ${sample} passed!\n\n`);
    }
  }
} else {
  const sample = resolve(__dirname, "../samples", `${name}.ts`);
  if (!existsSync(sample)) {
    console.error(`Sample ${name} not found`);
    process.exit(1);
  }
  await testModule(sample);
}

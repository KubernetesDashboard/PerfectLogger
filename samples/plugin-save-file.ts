import { readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

import { SimpleLogger } from "../src/main";
import { saveFile } from "../src/plugins";

export const test = () => {
  const logger = new SimpleLogger("Test");
  const dummyDir = resolve("/tmp/dummy-dir");
  logger.$extends(saveFile(dummyDir));

  logger.debug("Debug message");
  logger.info("Info message");
  logger.log("Log message");
  logger.warn("Warn message");
  logger.error("Error message");

  console.log("Check the dummy directory for the log files");
  console.log(readdirSync(dummyDir));
  logger.close().then(() => rmSync(dummyDir, { recursive: true }));
};

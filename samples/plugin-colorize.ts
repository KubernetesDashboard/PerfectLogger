import { SimpleLogger } from "../src/main";
import { colorize } from "../src/plugins";

export const test = () => {
  const logger = new SimpleLogger("Test");
  logger.$extends(colorize());

  logger.debug("Debug message");
  logger.info("Info message");
  logger.log("Info message");
  logger.warn("Warn message");
  logger.error("Error message");
};

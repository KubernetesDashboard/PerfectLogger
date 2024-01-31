import { SimpleLogger } from "../src/main";

export const test = () => {
  const logger = new SimpleLogger("Test NestJS", SimpleLogger.templates.SPRING_BOOT);

  logger.debug("Debug message");
  logger.info("Info message");
  logger.log("Info message");
  logger.warn("Warn message");
  logger.error("Error message");
};

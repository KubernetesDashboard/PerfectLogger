import { SimpleLogger } from "../src/main";

export const test = () => {
  const logger = new SimpleLogger("Test NestJS", SimpleLogger.templates.SPRING_BOOT);
  logger.log("Hello world");
};

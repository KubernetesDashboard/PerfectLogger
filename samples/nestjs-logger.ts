import { SimpleLogger } from "../src/main";

export const test = () => {
  const logger = new SimpleLogger("Test NestJS", SimpleLogger.templates.NESTJS);
  logger.log("Hello world");
};

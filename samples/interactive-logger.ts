import { colorize } from "../src/plugins";
import { LogLevel } from "../src/types/log-level";
import { InteractiveLogger } from "../src/utils/interactive-logger";

const sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1e3));

export const test = async () => {
  const logger = new InteractiveLogger(
    "MyLogger",
    InteractiveLogger.templates.SPRING_BOOT
  ).$extends(colorize());

  logger.debug("Hello, World!\n\nHello again!");
  await sleep(0.5);
  logger.info("Hello, World!\n\nHello again5!");
  await sleep(0.5);
  logger.log("Hello, World!\n\nHello again2!");
  await sleep(0.5);
  logger.warn("Hello, World!\n\nHello again3!");
  await sleep(0.5);
  logger.error("Hello, World!\n\nHello again4!");

  logger.interactivePrint([
    { message: "Debug", logLevel: LogLevel.DEBUG },
    { message: "Info", logLevel: LogLevel.INFO },
    "Log",
    { message: "Warn", logLevel: LogLevel.WARN },
    { message: "Error", logLevel: LogLevel.ERROR }
  ]);
};

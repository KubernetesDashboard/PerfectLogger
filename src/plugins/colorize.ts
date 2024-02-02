import chalk from "chalk";

import { LogLevel } from "../types/log-level";
import { Plugin } from "../types/plugin";

/**
 * Colorize the logs
 * @returns {Plugin} - The plugin object
 */
export const colorize = (): Plugin => {
  return {
    name: "perfect-logger:colorize",

    message(message: string, level: LogLevel): string {
      switch (level) {
        case LogLevel.DEBUG:
          return chalk.blue(message);

        case LogLevel.INFO:
          return chalk.green(message);

        case LogLevel.WARN:
          return chalk.yellow(message);

        case LogLevel.ERROR:
          return chalk.red(message);
      }

      return message;
    }
  };
};

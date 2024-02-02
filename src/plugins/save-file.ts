import { createWriteStream, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { LogLevel } from "../types/log-level";
import { Plugin } from "../types/plugin";

/**
 * Save logs to a file
 * @param {string} dir - The directory to save the logs
 * @returns {Plugin} - The plugin object
 */
export const saveFile = (dir: string = resolve("logs")): Plugin => {
  !existsSync(dir) && mkdirSync(dir);
  const streams = new Map<LogLevel | "logs", NodeJS.WritableStream>();
  const levels = Object.values(LogLevel);
  ([...levels, "logs"] as const).forEach(level => {
    const file = resolve(dir, `${level.toLowerCase()}.log`);
    !existsSync(file) && writeFileSync(file, "");
    streams.set(level, createWriteStream(file, { flags: "a" }));
  });

  return {
    name: "perfect-logger:save-to-file",

    message(message: string, level: LogLevel) {
      const stream = streams.get(level);
      stream?.write(`${message}\n`);
      streams.get("logs")?.write(`${message}\n`);
    },

    close() {
      let i = 0;
      return new Promise<void>((resolve, reject) => {
        try {
          streams.forEach(stream => {
            stream.end(() => {
              i++;
              if (i === streams.size) {
                resolve();
              }
            });
          });
        } catch (error) {
          reject(error);
        }
      });
    }
  };
};

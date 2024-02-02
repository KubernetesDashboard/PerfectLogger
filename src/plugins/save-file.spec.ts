import { rm } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { afterAll, describe, expect, it } from "vitest";

import { LogLevel } from "../types/log-level";
import { Plugin } from "../types/plugin";
import { saveFile } from "./save-file";

describe("saveToFile", () => {
  const message = "Test message";
  const logsDir = resolve("logs");
  let plugin: Plugin;

  afterAll(() => {
    plugin.close().then(() => rm(resolve(logsDir), { recursive: true }));
  });

  it("should return an object with correct properties", () => {
    plugin = saveFile(logsDir);

    expect(plugin).toHaveProperty("name");
    expect(plugin.name).toBe("perfect-logger:save-to-file");
    expect(plugin).toHaveProperty("message");
    expect(typeof plugin.message).toBe("function");
  });

  [LogLevel.DEBUG, LogLevel.INFO, LogLevel.LOG, LogLevel.WARN, LogLevel.ERROR].forEach(level => {
    it(`should write message to the correct ${level} level file`, async () => {
      plugin.message(message, level);

      const content = await readFile(resolve(logsDir, `${level.toLowerCase()}.log`), "utf-8");

      expect(content).toBe(`${message}\n`);
    });
  });

  it("should write message to the correct logs file", async () => {
    const content = await readFile(resolve(logsDir, "logs.log"), "utf-8");
    const levels = Object.values(LogLevel);
    expect(content).toBe(`${message}\n`.repeat(levels.length));
  });
});

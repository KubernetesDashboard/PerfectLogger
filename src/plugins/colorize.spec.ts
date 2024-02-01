import chalk from "chalk";
import { describe, expect, it } from "vitest";

import { LogLevel } from "../types/log-level";
import { colorize } from "./colorize";

describe("colorize plugin", () => {
  it("should colorize the debug level", () => {
    const result = colorize().message("Hello World!", LogLevel.DEBUG);
    expect(result).toBe(chalk.blue("Hello World!"));
  });

  it("should colorize the info level", () => {
    const result = colorize().message("Hello World!", LogLevel.INFO);
    expect(result).toBe(chalk.green("Hello World!"));
  });

  it("should colorize the log level", () => {
    const result = colorize().message("Hello World!", LogLevel.LOG);
    expect(result).toBe("Hello World!");
  });

  it("should colorize the warn level", () => {
    const result = colorize().message("Hello World!", LogLevel.WARN);
    expect(result).toBe(chalk.yellow("Hello World!"));
  });

  it("should colorize the error level", () => {
    const result = colorize().message("Hello World!", LogLevel.ERROR);
    expect(result).toBe(chalk.red("Hello World!"));
  });
});

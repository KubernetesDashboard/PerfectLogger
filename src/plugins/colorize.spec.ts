import { LogLevel } from "../types/log-level";
import { colorize } from "./colorize";

describe("colorize plugin", () => {
  it("should return the same message for each log level", () => {
    const input = "Hello, world!";
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.LOG, LogLevel.WARN, LogLevel.ERROR];

    levels.forEach(level => {
      const output = colorize().message(input, level);
      expect(output).toEqual(input);
    });
  });
});

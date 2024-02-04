import { beforeEach, describe, expect, it, vi } from "vitest";

import { LogLevel } from "../types/log-level";
import { Logger } from "./logger";

describe("Logger Class", () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger("TestLogger", Logger.templates.SPRING_BOOT);
  });

  it("should print DEBUG level message", () => {
    const consoleSpy = vi.spyOn(console, "log");
    logger.debug("Debug message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(LogLevel.DEBUG));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Debug message"));
    consoleSpy.mockRestore();
  });

  it("should print INFO level message", () => {
    const consoleSpy = vi.spyOn(console, "log");
    logger.info("Info message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(LogLevel.INFO));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Info message"));
    consoleSpy.mockRestore();
  });

  it("should print LOG level message", () => {
    const consoleSpy = vi.spyOn(console, "log");
    logger.log("Log message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(LogLevel.LOG));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Log message"));
    consoleSpy.mockRestore();
  });

  it("should print WARN level message", () => {
    const consoleSpy = vi.spyOn(console, "log");
    logger.warn("Warn message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(LogLevel.WARN));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Warn message"));
    consoleSpy.mockRestore();
  });

  it("should print ERROR level message", () => {
    const consoleSpy = vi.spyOn(console, "log");
    logger.error("Error message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(LogLevel.ERROR));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Error message"));
    consoleSpy.mockRestore();
  });
});

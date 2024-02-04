import { describe, expect, it } from "vitest";

import { LogLevel } from "./log-level";

describe("LogLevel Enum", () => {
  it("should have DEBUG level", () => {
    expect(LogLevel.DEBUG).toBe("debug");
  });

  it("should have LOG level", () => {
    expect(LogLevel.LOG).toBe("log");
  });

  it("should have INFO level", () => {
    expect(LogLevel.INFO).toBe("info");
  });

  it("should have WARN level", () => {
    expect(LogLevel.WARN).toBe("warn");
  });

  it("should have ERROR level", () => {
    expect(LogLevel.ERROR).toBe("error");
  });
});

import { describe, expect, it } from "vitest";

import { LogLevel } from "./log-level";

describe("LogLevel Enum", () => {
  it("should have DEBUG level", () => {
    expect(LogLevel.DEBUG).toBe("DEBUG");
  });

  it("should have LOG level", () => {
    expect(LogLevel.LOG).toBe("LOG");
  });

  it("should have INFO level", () => {
    expect(LogLevel.INFO).toBe("INFO");
  });

  it("should have WARN level", () => {
    expect(LogLevel.WARN).toBe("WARN");
  });

  it("should have ERROR level", () => {
    expect(LogLevel.ERROR).toBe("ERROR");
  });
});

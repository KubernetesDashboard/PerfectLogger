import { beforeEach, describe, expect, it, vi } from "vitest";

import { InteractiveMessage } from "../types/interactive-message";
import { LogLevel } from "../types/log-level";
import { InteractiveLogger } from "./interactive-logger";

describe("InteractiveLogger", () => {
  let logger: InteractiveLogger;

  beforeEach(() => {
    logger = new InteractiveLogger();
  });

  it("should print interactive messages", () => {
    const messages: (InteractiveMessage | string)[] = [
      "Test message",
      { message: "Test message 2", logLevel: LogLevel.LOG }
    ];
    // @ts-ignore
    const spy = vi.spyOn(logger, "print");
    logger.interactivePrint(messages);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

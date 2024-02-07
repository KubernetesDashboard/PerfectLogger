import { InteractiveMessage } from "../types/interactive-message";
import { LogLevel } from "../types/log-level";
import { ValueOf } from "../types/value-of";
import { Logger } from "./logger";

export class InteractiveLogger extends Logger {
  protected declare previousMessage: string;
  protected declare previousLogLevel: ValueOf<typeof LogLevel>;

  moveMouse(x: number, y: number) {
    if (!process.stdout.isTTY) {
      return this;
    }

    const isYPositive = y > 0;
    while ((isYPositive && y > 0) || (!isYPositive && y < 0)) {
      this.clearLine();
      process.stdout.moveCursor(0, isYPositive ? 1 : -1);
      y += isYPositive ? -1 : 1;
    }
    this.clearLine();
    process.stdout.cursorTo(x);

    return this;
  }

  clearLine() {
    if (!process.stdout.isTTY) {
      return this;
    }

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);

    return this;
  }

  interactivePrint(messages: string | (InteractiveMessage | string)[]) {
    const printableMessages = (typeof messages === "string" ? messages.split("\n") : messages).map(
      message => (typeof message === "string" ? { message, logLevel: LogLevel.LOG } : message)
    );

    const handledMessages = printableMessages
      .map(({ message, logLevel }) =>
        this.plugins.reduce(
          (message, plugin) => plugin.message?.(message, logLevel) || message,
          this.message([message], logLevel)
        )
      )
      .join("\n");

    this.print(handledMessages, LogLevel.LOG, false);
  }

  protected print(message: string, logLevel: ValueOf<typeof LogLevel>, formatMessages = true) {
    if (this.previousMessage && this.previousLogLevel !== LogLevel.ERROR) {
      const lines = this.previousMessage.split("\n").length;
      this.moveMouse(0, -lines);
    }
    super.print(message, logLevel, formatMessages);
    this.previousMessage = message;
    this.previousLogLevel = logLevel;
  }
}

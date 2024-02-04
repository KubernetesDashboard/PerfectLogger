import { LogLevel } from "./log-level";
import { ValueOf } from "./value-of";

export interface InteractiveMessage {
  message: string;
  logLevel: ValueOf<typeof LogLevel>;
}

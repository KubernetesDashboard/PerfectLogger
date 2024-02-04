import { LogLevel } from "./log-level";
import { ValueOf } from "./value-of";

export interface Plugin {
  name: string;

  message?(message: string, level: ValueOf<typeof LogLevel>): string | void;

  close?(): Promise<void>;
}

export type PluginContext = Plugin | Plugin[];

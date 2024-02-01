import { LogLevel } from "./log-level";

export interface Plugin {
  name: string;

  message?(message: string, level: LogLevel): string;
}

export type PluginContext = Plugin | Plugin[];

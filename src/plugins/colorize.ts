// import  chalk from "chalk";
import { LogLevel } from "../types/log-level";
import { PluginContext } from "../types/plugin";

export const colorize = () => {
  return {
    name: "perfect-logger:colorize",

    message(message: string, level: LogLevel): string {
      return message;
    }
  } satisfies PluginContext;
};

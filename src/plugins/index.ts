import { PluginContext } from "../types/plugin";
import * as colorize from "./colorize";

export const recommended: Record<string, PluginContext> = { ...colorize };

export * from "./colorize";

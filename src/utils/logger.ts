import { LogLevel } from "../types/log-level";
import { OnlyFn } from "../types/only-fn";
import { Plugin, PluginContext } from "../types/plugin";
import { ValueOf } from "../types/value-of";

/**
 * Logger class
 * @class
 * @public
 * @example
 * import { Logger } from "./utils/logger";
 *
 * const logger = new Logger("MyLogger");
 * logger.log("<Anything you want to log>");
 */
export class Logger {
  /**
   * Templates for different frameworks
   * @static
   * @public
   */
  static templates = {
    NESTJS: `[%appName] %pid - %date(MM/DD/YYYY, hh:mm:ss A) [%name] %message`,
    SPRING_BOOT: `%date(YYYY-MM-DD hh:mm:ss.ms) %spaces(%level, 5, true) %pid --- [%spaces(%name, 15, true)] %spaces(%module, 15)  : %message`,
    DEFAULT: `[%name] [%datetime] %message`
  };

  private static plugins: Plugin[] = [];
  protected plugins: Plugin[] = [];

  constructor(
    /**
     * Name of the logger used in
     */
    protected readonly name: string = process.env.NAME || "Logger",
    /**
     * Template for the logger
     * Variables used in the template:
     *  - %name: Logger name
     *  - %datetime: Current date and time in ISO format
     *  - %date(format: string): Current date in the given format:
     *    - MM: Month
     *    - DD: Day
     *    - YYYY: Year
     *    - hh: Hours
     *    - mm: Minutes
     *    - ss: Seconds
     *    - ms: Milliseconds
     *    - A: AM/PM
     *  - %pid: Process ID
     *  - %appName: Application name
     *  - %message: The message to log
     *  - %level: The log level
     *  - %module: The module name
     *  - %spaces(content: string, length: number, before: boolean): Fit content to the given length with spaces
     *    - content: The string to fit
     *    - length: The length to fit the string
     *    - before: If true, the spaces will be added before the string, otherwise after
     */
    protected readonly template: string = Logger.templates.DEFAULT,
    /**
     * Application name to use in the logs
     */
    protected readonly appName: string = process.env.APP_NAME || "PerfectLogger"
  ) {}

  $extends(plugin: PluginContext, global = false) {
    const plugins = global ? Logger.plugins : this.plugins;
    const userExtendPlugins = Array.isArray(plugin) ? plugin : [plugin];
    plugins.push(...userExtendPlugins);
    return this;
  }

  /**
   * Debug level
   * @param {any[]} messages
   */
  debug<TMessage extends any[]>(...messages: TMessage) {
    this.print(this.message(messages, LogLevel.DEBUG), LogLevel.DEBUG);
  }

  /**
   * Debug level
   * @param {any[]} messages
   */
  info<TMessage extends any[]>(...messages: TMessage) {
    this.print(this.message(messages, LogLevel.INFO), LogLevel.INFO);
  }

  /**
   * Debug level
   * @param {any[]} messages
   */
  log<TMessage extends any[]>(...messages: TMessage) {
    this.print(this.message(messages, LogLevel.LOG), LogLevel.LOG);
  }

  /**
   * Debug level
   * @param {any[]} messages
   */
  warn<TMessage extends any[]>(...messages: TMessage) {
    this.print(this.message(messages, LogLevel.WARN), LogLevel.WARN);
  }

  /**
   * Debug level
   * @param {any[]} messages
   */
  error<TMessage extends any[]>(...messages: TMessage) {
    this.print(this.message(messages, LogLevel.ERROR), LogLevel.ERROR);
  }

  /**
   * Close all possible connections in the plugins
   */
  close() {
    return Promise.all([
      ...this.plugins.map(plugin => plugin.close?.()),
      ...Logger.plugins.map(plugin => plugin.close?.())
    ]);
  }

  protected print(message: string, logLevel: ValueOf<typeof LogLevel>, formatMessages = true) {
    const formattedMessage = this.plugins.reduce(
      (message, plugin) => plugin.message?.(message, logLevel) || message,
      message
    );

    console.log(formatMessages ? formattedMessage : message);
  }

  protected message<TMessage extends any[]>(messages: TMessage, level: ValueOf<typeof LogLevel>) {
    const messageItems = messages.flatMap(message => this.stringifyMessage(message)).join(" ");
    return messageItems
      .split("\n")
      .map(message => this.formatMessage(message, level))
      .join("\n");
  }

  protected formatMessage(message: string, level: ValueOf<typeof LogLevel>) {
    return this.template
      .replace("%name", this.name)
      .replace("%datetime", new Date().toISOString())
      .replace("%pid", process.pid.toString())
      .replace("%appName", this.appName)
      .replace("%message", message)
      .replace(/%date\((.+?)\)/g, (_, format) => this.formatDate(format))
      .replace(/%level/g, level)
      .replace(/%module/g, "<WIP>")
      .replace(/%spaces\((.+?)\)/g, (_, args) => this.space(args));
  }

  protected space(args: string) {
    const [rawString, rawLength, rawBefore = "false"] = args.split(",");
    const [string, length, before] = [rawString.trim(), +rawLength.trim(), rawBefore.trim()];
    return this.fitDataToLength(string, length, before === "true");
  }

  protected fitDataToLength(data: string, maxLength: number, before = false) {
    const dataSlices = data.split("\n");
    return dataSlices.map(slice => this.fitSliceToLength(slice, maxLength, before)).join("\n");
  }

  protected fitSliceToLength(slice: string, maxLength: number, before = false) {
    if (slice.length >= maxLength) {
      return before ? slice.slice(-maxLength) : slice.slice(0, maxLength);
    }
    return before ? slice.padStart(maxLength, " ") : slice.padEnd(maxLength, " ");
  }

  protected formatDate(format: string) {
    return format
      .replace("MM", (new Date().getMonth() + 1).toString().padEnd(2, "0"))
      .replace("DD", new Date().getDate().toString().padEnd(2, "0"))
      .replace("YYYY", new Date().getFullYear().toString())
      .replace("hh", new Date().getHours().toString().padEnd(2, "0"))
      .replace("h", (new Date().getHours() % 12).toString().padEnd(2, "0"))
      .replace("mm", new Date().getMinutes().toString().padEnd(2, "0"))
      .replace("ss", new Date().getSeconds().toString().padEnd(2, "0"))
      .replace("ms", new Date().getMilliseconds().toString().padEnd(3, "0"))
      .replace("A", new Date().getHours() < 12 ? "AM" : "PM");
  }

  protected stringifyMessage = <TMessage>(message: TMessage) => {
    switch (true) {
      case message === null:
        return "null";
      case message === undefined:
        return "undefined";
      case message instanceof Error:
        return `${message.name}: ${message.message}\n${message.stack}`;
      case typeof message === "function":
        return `function ${message.name}() { ... }`;
      case typeof message === "object":
        return JSON.stringify(message, null, 2);
      default:
        return message.toString();
    }
  };
}

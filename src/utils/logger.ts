export class Logger {
  static templates = {
    DEFAULT: `[%name] [%datetime] %message`
  };

  constructor(
    private readonly _name: string = process.env.NAME || "PerfectLogger",
    private readonly _template: string = Logger.templates.DEFAULT
  ) {}

  log<TMessage extends any[]>(...messages: TMessage) {
    this.print(this.message(messages));
  }

  private print(message: string) {
    console.log(message);
  }

  private message<TMessage extends any[]>(messages: TMessage) {
    const messageItems = messages.flatMap(message => this.stringifyMessage(message)).join(" ");
    return messageItems
      .split("\n")
      .map(message => this.formatMessage(message))
      .join("\n");
  }

  private formatMessage(message: string) {
    return this._template
      .replace("%name", this._name)
      .replace("%datetime", new Date().toISOString())
      .replace("%message", message);
  }

  private stringifyMessage = <TMessage>(message: TMessage) => {
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

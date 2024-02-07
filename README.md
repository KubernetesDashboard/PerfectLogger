Based on the project files, the README could be structured as follows:

# Perfect Logger

The cornerstone of any project lies in its robust logging system. This project offers a streamlined and adaptable
logging solution tailored for Node.js projects. It encompasses a diverse array of loggers, including simple and
interactive variants, each equipped with various log levels, widely-used framework log templates, and plugins designed
to augment the loggers' capabilities

## Getting Started

To get started with this project, clone the repository and install the dependencies using either `yarn` or `npm`.

```bash
yarn add @mdreal/perfect-logger
# or
npm install @mdreal/perfect-logger
```

## Usage

The project exports two main classes: `Logger` and `InteractiveLogger`.

`Logger` is a simple logging class with customizable templates. It supports different log levels such as debug, info,
log, warn, and error.

`InteractiveLogger` extends the `Logger` class and provides additional functionality for interactive logging.

The project also exports a set of plugins that can be used to extend the functionality of the loggers. Currently, there
are two plugins available: `colorize` and `saveFile`.

### Logger

Here is an example of how to use the `Logger` class:

```typescript
import { Logger } from "@mdreal/perfect-logger";

const logger = new Logger("MyLogger");
logger.log("This is a log message");
```

### InteractiveLogger

Here is an example of how to use the `InteractiveLogger` class:

```typescript
import { InteractiveLogger } from "@mdreal/perfect-logger";

const logger = new InteractiveLogger("MyLogger");
logger.log("This is a log message");
```

In the given example `InteractiveLogger` effects like simple `Logger`. For extended usage next example is provided.

```typescript
import { InteractiveLogger } from "@mdreal/perfect-logger";

const logger = new InteractiveLogger("MyLogger");
logger.interactivePrint("This is a log message.\nIt can be multiline");
logger.interactivePrint([
  "Or array of string",
  { logLevel: "error", message: "Or object with predefined log level" }
]);
```

> [!NOTE]
> Each next call will update previous message in the console.

### Plugins

Here is an example of how to use the plugins:

```typescript
import { Logger, plugins } from "@mdreal/perfect-logger";

const logger = new Logger("MyLogger");
logger.$extends(plugins.colorize());
logger.$extends(plugins.saveFile("/some/optional/path/to/directory/of/logs"));
logger.log("This is a log message");
```

For a comprehensive list of plugins, I recommend utilizing the `logger.$extends(plugins.recommended())` method

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

This project is licensed under the Apache-2.0 License.

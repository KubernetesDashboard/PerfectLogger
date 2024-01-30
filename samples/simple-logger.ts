import { SimpleLogger } from "../src/main";

export const test = () => {
  const logger = new SimpleLogger("Test");
  logger.log("Hello world");
  logger.log("Log error for test", new Error("This is an error"));
  logger.log("Log boolean for test", true);
  logger.log("Log number for test", 42);
  logger.log("Log string for test", "Hello world");
  logger.log("Log undefined for test", undefined);
  logger.log("Log null for test", null);
  logger.log("Log symbol for test", Symbol("foo"));
  logger.log("Log arrow function for test", () => {});
  logger.log("Log anonymous function for test", function () {});
  logger.log("Log named function for test", function foo() {});
  logger.log("Log array for test", [1, 2, 3, 4, 5]);
  logger.log("Log small object for test", { foo: "bar" });
  logger.log("Log big object for test", {
    foo: "bar",
    baz: "qux",
    quux: "quuz",
    corge: "grault",
    garply: "waldo",
    fred: "plugh",
    xyzzy: "thud"
  });
};

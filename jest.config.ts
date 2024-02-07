import type { Config } from "jest";

export default {
  testEnvironment: "node",
  automock: true,
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"]
} satisfies Config;

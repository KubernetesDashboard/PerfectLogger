import type { Config } from "jest";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js"],

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"]
} satisfies Config;

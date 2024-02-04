import { describe, expect, it } from "vitest";

import { ValueOf } from "./value-of";

describe("ValueOf Type", () => {
  it("should return the correct value for a number type", () => {
    type TestType = { num: number };
    const testObj: TestType = { num: 123 };
    const value: ValueOf<TestType> = testObj["num"];
    expect(value).toBe(123);
  });

  it("should return the correct value for a string type", () => {
    type TestType = { str: string };
    const testObj: TestType = { str: "test" };
    const value: ValueOf<TestType> = testObj["str"];
    expect(value).toBe("test");
  });

  it("should return the correct value for a boolean type", () => {
    type TestType = { bool: boolean };
    const testObj: TestType = { bool: true };
    const value: ValueOf<TestType> = testObj["bool"];
    expect(value).toBe(true);
  });

  it("should return the correct value for an array type", () => {
    type TestType = { arr: number[] };
    const testObj: TestType = { arr: [1, 2, 3] };
    const value: ValueOf<TestType> = testObj["arr"];
    expect(value).toEqual([1, 2, 3]);
  });

  it("should return the correct value for an object type", () => {
    type TestType = { obj: { key: string } };
    const testObj: TestType = { obj: { key: "value" } };
    const value: ValueOf<TestType> = testObj["obj"];
    expect(value).toEqual({ key: "value" });
  });

  it("should return the correct value for null and undefined types", () => {
    type TestType = { nullValue: null; undefinedValue: undefined };
    const testObj: TestType = { nullValue: null, undefinedValue: undefined };

    const nullValue: ValueOf<TestType> = testObj.nullValue;
    expect(nullValue).toBeNull();

    const undefinedValue: ValueOf<TestType> = testObj.undefinedValue;
    expect(undefinedValue).toBeUndefined();
  });
});

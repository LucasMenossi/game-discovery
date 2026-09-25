import { describe, expect, it } from "vitest";
import { parsePage } from "./parsePage";

describe("parsePage", () => {
  it("returns 1 when value is undefined", () => {
    expect(parsePage()).toBe(1);
  });

  it("returns 1 when value is empty", () => {
    expect(parsePage("")).toBe(1);
  });

  it("returns the parsed page for a valid integer", () => {
    expect(parsePage("3")).toBe(3);
  });

  it("returns 1 for zero", () => {
    expect(parsePage("0")).toBe(1);
  });

  it("returns 1 for negative numbers", () => {
    expect(parsePage("-2")).toBe(1);
  });

  it("returns 1 for decimal numbers", () => {
    expect(parsePage("2.5")).toBe(1);
  });

  it("returns 1 for non-numeric values", () => {
    expect(parsePage("abc")).toBe(1);
  });
});

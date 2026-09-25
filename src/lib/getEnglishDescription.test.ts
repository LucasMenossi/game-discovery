import { describe, expect, it } from "vitest";
import { getEnglishDescription } from "./getEnglishDescription";

describe("getEnglishDescription", () => {
  it("splits the description into paragraphs", () => {
    const description = `
      First paragraph.

      Second paragraph.
    `;

    expect(getEnglishDescription(description)).toEqual([
      "First paragraph.",
      "Second paragraph.",
    ]);
  });

  it("stops at the Spanish section", () => {
    const description =
      "English paragraph.\n\n" +
      "Another English paragraph.\n" +
      "Español\n" +
      "Spanish paragraph.";

    expect(getEnglishDescription(description)).toEqual([
      "English paragraph.",
      "Another English paragraph.",
    ]);
  });

  it("trims whitespace from paragraphs", () => {
    const description = `
      First paragraph with spaces.

        Second paragraph with indentation.
    `;

    expect(getEnglishDescription(description)).toEqual([
      "First paragraph with spaces.",
      "Second paragraph with indentation.",
    ]);
  });

  it("removes empty paragraphs", () => {
    const description = `
      First paragraph.



      Second paragraph.
    `;

    expect(getEnglishDescription(description)).toEqual([
      "First paragraph.",
      "Second paragraph.",
    ]);
  });

  it("returns an empty array for an empty description", () => {
    expect(getEnglishDescription("")).toEqual([]);
  });
});

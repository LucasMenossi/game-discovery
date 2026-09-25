import { describe, expect, it } from "vitest";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { updateSearchParams } from "./updateSearchParams";

function createSearchParams(value: string): ReadonlyURLSearchParams {
  return {
    toString: () => value,
  } as ReadonlyURLSearchParams;
}

describe("updateSearchParams", () => {
  it("adds a new search parameter", () => {
    const searchParams = createSearchParams("search=zelda");

    const result = updateSearchParams(searchParams, {
      genre: "action",
    });

    expect(result.toString()).toBe("search=zelda&genre=action");
  });

  it("updates an existing search parameter", () => {
    const searchParams = createSearchParams("search=zelda&genre=action");

    const result = updateSearchParams(searchParams, {
      genre: "adventure",
    });

    expect(result.toString()).toBe("search=zelda&genre=adventure");
  });

  it("removes a search parameter when its value is null", () => {
    const searchParams = createSearchParams("search=zelda&genre=action&page=2");

    const result = updateSearchParams(searchParams, {
      genre: null,
    });

    expect(result.toString()).toBe("search=zelda&page=2");
  });

  it("updates multiple search parameters", () => {
    const searchParams = createSearchParams("search=zelda&genre=action&page=2");

    const result = updateSearchParams(searchParams, {
      search: "mario",
      genre: "platformer",
      page: "1",
    });

    expect(result.toString()).toBe("search=mario&genre=platformer&page=1");
  });

  it("does not mutate the original search parameters", () => {
    const searchParams = createSearchParams("search=zelda&genre=action");

    updateSearchParams(searchParams, {
      genre: "adventure",
    });

    expect(searchParams.toString()).toBe("search=zelda&genre=action");
  });
});

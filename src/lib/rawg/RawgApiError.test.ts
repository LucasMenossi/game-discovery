import { describe, expect, it } from "vitest";
import { RawgApiError } from "./RawgApiError";

describe("RawgApiError", () => {
  it("creates an error with the given status", () => {
    const error = new RawgApiError(404);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(RawgApiError);
    expect(error.name).toBe("RawgApiError");
    expect(error.status).toBe(404);
    expect(error.message).toBe("RAWG API error: 404");
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";

import { getGenre } from "./genres";

const genre = {
  id: 4,
  slug: "action",
  name: "Action",
  games_count: 1000,
  image_background: "https://example.com/action.jpg",
};

describe("getGenre", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches a genre by slug with stable revalidation", async () => {
    vi.stubEnv("RAWG_API_KEY", "test-key");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(genre), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getGenre("action")).resolves.toEqual(genre);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.rawg.io/api/genres/action?key=test-key",
      expect.objectContaining({ next: { revalidate: 3600 } }),
    );
  });

  it("encodes the slug in the request path", async () => {
    vi.stubEnv("RAWG_API_KEY", "test-key");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(genre), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await getGenre("action/adventure");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.rawg.io/api/genres/action%2Fadventure?key=test-key",
      expect.anything(),
    );
  });

  it("throws when RAWG returns an error", async () => {
    vi.stubEnv("RAWG_API_KEY", "test-key");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 404 })),
    );

    await expect(getGenre("does-not-exist")).rejects.toMatchObject({
      name: "RawgApiError",
      status: 404,
    });
  });
});

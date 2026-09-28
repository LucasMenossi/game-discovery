import { afterEach, describe, expect, it, vi } from "vitest";

import { getPlatform } from "./platforms";

const platform = {
  id: 4,
  slug: "pc",
  name: "PC",
  games_count: 5000,
  image_background: "https://example.com/pc.jpg",
};

describe("getPlatform", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches a platform by slug with stable revalidation", async () => {
    vi.stubEnv("RAWG_API_KEY", "test-key");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify(platform), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getPlatform("pc")).resolves.toEqual(platform);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.rawg.io/api/platforms/pc?key=test-key",
      expect.objectContaining({ next: { revalidate: 3600 } }),
    );
  });

  it("throws when RAWG returns an error", async () => {
    vi.stubEnv("RAWG_API_KEY", "test-key");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 500 })),
    );

    await expect(getPlatform("pc")).rejects.toMatchObject({
      name: "RawgApiError",
      status: 500,
    });
  });
});

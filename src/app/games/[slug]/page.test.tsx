import { describe, expect, it, vi } from "vitest";

import { getEnglishDescription } from "@/lib/getEnglishDescription";
import { getGame } from "@/lib/rawg/games";

import { generateMetadata } from "./page";

vi.mock("@/lib/rawg/games", () => ({
  getGame: vi.fn(),
}));

vi.mock("@/lib/getEnglishDescription", () => ({
  getEnglishDescription: vi.fn(),
}));

const mockedGetGame = vi.mocked(getGame);
const mockedGetEnglishDescription = vi.mocked(getEnglishDescription);

const game = {
  id: 1,
  slug: "the-witcher-3-wild-hunt",
  name: "The Witcher 3: Wild Hunt",
  description_raw: "<p>An epic open-world RPG.</p>",
  released: "2015-05-18",
  background_image: "https://example.com/witcher-3.jpg",
  rating: 4.7,
  metacritic: 92,
  website: "https://example.com",
  esrb_rating: {
    id: 1,
    name: "Mature",
    slug: "mature",
  },
  genres: [],
  tags: [],
  developers: [],
  publishers: [],
  platforms: [],
};

describe("generateMetadata", () => {
  it("generates metadata from the game", async () => {
    mockedGetGame.mockResolvedValue(game);
    mockedGetEnglishDescription.mockReturnValue([
      "An epic open-world RPG set in a fantasy world.",
    ]);

    const metadata = await generateMetadata({
      params: Promise.resolve({
        slug: "the-witcher-3-wild-hunt",
      }),
    });

    expect(metadata).toEqual({
      title: "The Witcher 3: Wild Hunt | Game Discovery",
      description: "An epic open-world RPG set in a fantasy world.",
      alternates: {
        canonical: "/games/the-witcher-3-wild-hunt",
      },
      openGraph: {
        title: "The Witcher 3: Wild Hunt | Game Discovery",
        description: "An epic open-world RPG set in a fantasy world.",
        url: "/games/the-witcher-3-wild-hunt",
        siteName: "Game Discovery",
        type: "website",
        images: [
          {
            url: "https://example.com/witcher-3.jpg",
            alt: "The Witcher 3: Wild Hunt",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "The Witcher 3: Wild Hunt | Game Discovery",
        description: "An epic open-world RPG set in a fantasy world.",
        images: ["https://example.com/witcher-3.jpg"],
      },
    });

    expect(mockedGetGame).toHaveBeenCalledWith("the-witcher-3-wild-hunt");
  });

  it("limits the description to 160 characters", async () => {
    mockedGetGame.mockResolvedValue(game);

    const description = "A".repeat(200);

    mockedGetEnglishDescription.mockReturnValue([description]);

    const metadata = await generateMetadata({
      params: Promise.resolve({
        slug: game.slug,
      }),
    });

    expect(metadata.description).toBe("A".repeat(160));
  });

  it("uses a fallback description when no English description is available", async () => {
    mockedGetGame.mockResolvedValue(game);
    mockedGetEnglishDescription.mockReturnValue([]);

    const metadata = await generateMetadata({
      params: Promise.resolve({
        slug: game.slug,
      }),
    });

    expect(metadata.description).toBe(
      `Discover information about ${game.name}.`,
    );
  });

  it("omits images when the game has no background image", async () => {
    mockedGetGame.mockResolvedValue({
      ...game,
      background_image: null,
    });

    mockedGetEnglishDescription.mockReturnValue(["An epic open-world RPG."]);

    const metadata = await generateMetadata({
      params: Promise.resolve({
        slug: game.slug,
      }),
    });

    expect(metadata.openGraph).toMatchObject({
      images: undefined,
    });

    expect(metadata.twitter).toMatchObject({
      images: undefined,
    });
  });
});

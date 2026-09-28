import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { getGameSeries } from "@/lib/rawg/games";
import type { Game } from "@/lib/rawg/games";

import { RelatedGames } from "./RelatedGames";

vi.mock("@/lib/rawg/games", () => ({
  getGameSeries: vi.fn(),
}));

const createGame = (id: number, name: string): Game => ({
  id,
  slug: `game-${id}`,
  name,
  released: "2025-01-01",
  background_image: null,
  rating: 4,
  metacritic: null,
});

const games = [
  createGame(1, "Game One"),
  createGame(2, "Game Two"),
  createGame(3, "Game Three"),
];

function createGamesResponse(results: Game[]) {
  return {
    count: results.length,
    next: null,
    previous: null,
    results,
  };
}

describe("RelatedGames", () => {
  it("renders nothing when there are no related games", async () => {
    vi.mocked(getGameSeries).mockResolvedValue(createGamesResponse([]));

    const ui = await RelatedGames({ gameId: 1 });

    const { container } = render(ui);

    expect(container).toBeEmptyDOMElement();
  });

  it("does not render the current game", async () => {
    vi.mocked(getGameSeries).mockResolvedValue(createGamesResponse(games));

    const ui = await RelatedGames({ gameId: 1 });

    render(ui);

    expect(screen.getByText("Game Two")).toBeInTheDocument();
    expect(screen.getByText("Game Three")).toBeInTheDocument();
    expect(screen.queryByText("Game One")).not.toBeInTheDocument();
  });

  it("renders related games", async () => {
    vi.mocked(getGameSeries).mockResolvedValue(createGamesResponse(games));

    const ui = await RelatedGames({ gameId: 1 });

    render(ui);

    expect(
      screen.getByRole("heading", { name: "Related Games" }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole("link")).toHaveLength(2);

    expect(screen.getByRole("link", { name: /Game Two/i })).toHaveAttribute(
      "href",
      "/games/game-2",
    );

    expect(screen.getByRole("link", { name: /Game Three/i })).toHaveAttribute(
      "href",
      "/games/game-3",
    );
  });

  it("limits related games to six", async () => {
    const manyGames = Array.from({ length: 10 }, (_, index) =>
      createGame(index + 1, `Game ${index + 1}`),
    );

    vi.mocked(getGameSeries).mockResolvedValue(createGamesResponse(manyGames));

    const ui = await RelatedGames({ gameId: 1 });

    render(ui);

    expect(screen.getAllByRole("link")).toHaveLength(6);
  });
});

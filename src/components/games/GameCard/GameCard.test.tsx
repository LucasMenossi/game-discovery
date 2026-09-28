import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Game } from "@/lib/rawg/games";

import { GameCard } from "./GameCard";

const game: Game = {
  id: 1,
  slug: "the-witcher-3-wild-hunt",
  name: "The Witcher 3: Wild Hunt",
  background_image: "https://example.com/witcher-3.jpg",
  rating: 4.5,
  released: "2015-05-19",
  metacritic: 90,
};

describe("GameCard", () => {
  it("renders the game information", () => {
    render(<GameCard game={game} />);

    expect(
      screen.getByRole("link", {
        name: /The Witcher 3: Wild Hunt/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("The Witcher 3: Wild Hunt")).toBeInTheDocument();

    expect(screen.getByText("4.50")).toBeInTheDocument();
    expect(screen.getByText("2015")).toBeInTheDocument();
  });

  it("links to the game details page", () => {
    render(<GameCard game={game} />);

    expect(
      screen.getByRole("link", {
        name: /The Witcher 3: Wild Hunt/i,
      }),
    ).toHaveAttribute("href", "/games/the-witcher-3-wild-hunt");
  });

  it("renders a placeholder when the game has no image", () => {
    render(
      <GameCard
        game={{
          ...game,
          background_image: null,
        }}
      />,
    );

    expect(screen.getByText("No image available")).toBeInTheDocument();

    expect(
      screen.queryByAltText("The Witcher 3: Wild Hunt"),
    ).not.toBeInTheDocument();
  });

  it("does not render the release year when the game has no release date", () => {
    render(
      <GameCard
        game={{
          ...game,
          released: null,
        }}
      />,
    );

    expect(screen.queryByText("2015")).not.toBeInTheDocument();
  });

  it("formats the rating to two decimal places", () => {
    render(
      <GameCard
        game={{
          ...game,
          rating: 4,
        }}
      />,
    );

    expect(screen.getByText("4.00")).toBeInTheDocument();
  });
});

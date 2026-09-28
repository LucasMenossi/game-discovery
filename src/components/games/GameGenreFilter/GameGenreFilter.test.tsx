import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { GameGenreFilter } from "./GameGenreFilter";

const pushMock = vi.fn();

const searchParams = new URLSearchParams();

const genres = [
  {
    id: 4,
    name: "Action",
    slug: "action",
  },
  {
    id: 3,
    name: "Adventure",
    slug: "adventure",
  },
];

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => "/games",
  useSearchParams: () => ({
    get: (key: string) => searchParams.get(key),
    toString: () => searchParams.toString(),
  }),
}));

describe("GameGenreFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    searchParams.delete("genre");
    searchParams.delete("page");
  });

  it("renders all genres as the default selection", () => {
    render(<GameGenreFilter genres={genres} />);

    expect(screen.getByRole("combobox")).toHaveTextContent("All genres");
  });

  it("updates the URL when a genre is selected", async () => {
    const user = userEvent.setup();

    render(<GameGenreFilter genres={genres} />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByRole("option", { name: "Action" })).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Action" }));

    expect(pushMock).toHaveBeenCalledWith("/games?genre=action");
  });

  it("removes the genre and page parameters when all genres is selected", async () => {
    searchParams.set("genre", "action");
    searchParams.set("page", "3");

    const user = userEvent.setup();

    render(<GameGenreFilter genres={genres} />);

    await user.click(screen.getByRole("combobox"));

    await user.click(screen.getByRole("option", { name: "All genres" }));

    expect(pushMock).toHaveBeenCalledWith("/games");
  });
});

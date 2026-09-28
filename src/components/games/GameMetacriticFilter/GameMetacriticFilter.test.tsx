import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameMetacriticFilter } from "./GameMetacriticFilter";

const pushMock = vi.fn();
const searchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => ({
    get: (key: string) => searchParams.get(key),
    toString: () => searchParams.toString(),
  }),
}));

describe("GameMetacriticFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParams.delete("metacritic");
    searchParams.delete("page");
  });

  it("renders all Metacritic scores by default", () => {
    render(<GameMetacriticFilter />);

    expect(screen.getByRole("combobox")).toHaveTextContent(
      "All Metacritic scores",
    );
  });

  it("updates the URL when a Metacritic range is selected", async () => {
    const user = userEvent.setup();

    render(<GameMetacriticFilter />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "90-100" }));

    expect(pushMock).toHaveBeenCalledWith("/games?metacritic=90%2C100");
  });

  it("removes the Metacritic and page parameters when all scores is selected", async () => {
    const user = userEvent.setup();

    searchParams.set("metacritic", "90,100");
    searchParams.set("page", "3");

    render(<GameMetacriticFilter />);

    await user.click(screen.getByRole("combobox"));
    await user.click(
      screen.getByRole("option", { name: "All Metacritic scores" }),
    );

    expect(pushMock).toHaveBeenCalledWith("/games?");
  });
});

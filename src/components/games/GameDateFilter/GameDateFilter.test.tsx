import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameDateFilter } from "./GameDateFilter";

const pushMock = vi.fn();
const searchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => searchParams.get(key),
    toString: () => searchParams.toString(),
  }),
}));

describe("GameDateFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParams.delete("dates");
    searchParams.delete("page");
  });

  it("renders all release dates by default", () => {
    render(<GameDateFilter />);

    expect(screen.getByRole("combobox")).toHaveTextContent("All release dates");
  });

  it("updates the URL when a release date is selected", async () => {
    const user = userEvent.setup();

    render(<GameDateFilter />);

    await user.click(screen.getByRole("combobox"));

    await user.click(
      screen.getByRole("option", {
        name: "Released in 2026",
      }),
    );

    expect(pushMock).toHaveBeenCalledWith(
      "/games?dates=2026-01-01%2C2026-12-31",
    );
  });

  it("removes the dates and page parameters when all release dates is selected", async () => {
    const user = userEvent.setup();

    searchParams.set("dates", "2026-01-01,2026-12-31");
    searchParams.set("page", "3");

    render(<GameDateFilter />);

    await user.click(screen.getByRole("combobox"));

    await user.click(
      screen.getByRole("option", {
        name: "All release dates",
      }),
    );

    expect(pushMock).toHaveBeenCalledWith("/games?");
  });
});

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameSort } from "./GameSort";

const pushMock = vi.fn();
const searchParams = new URLSearchParams();

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

describe("GameSort", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParams.delete("sort");
    searchParams.delete("page");
  });

  it("renders default sorting by default", () => {
    render(<GameSort />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Default Sorting");
  });

  it("updates the URL when a sort option is selected", async () => {
    const user = userEvent.setup();

    render(<GameSort />);

    await user.click(screen.getByRole("combobox"));

    await user.click(
      screen.getByRole("option", {
        name: "Rating: High to Low",
      }),
    );

    expect(pushMock).toHaveBeenCalledWith("/games?sort=-rating");
  });

  it("removes the sort and page parameters when default sorting is selected", async () => {
    const user = userEvent.setup();

    searchParams.set("sort", "-rating");
    searchParams.set("page", "3");

    render(<GameSort />);

    await user.click(screen.getByRole("combobox"));

    await user.click(
      screen.getByRole("option", {
        name: "Default Sorting",
      }),
    );

    expect(pushMock).toHaveBeenCalledWith("/games");
  });
});

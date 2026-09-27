import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GamePagination } from "./GamePagination";

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

describe("GamePagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParams.delete("page");
    searchParams.delete("search");
  });

  it("disables the previous button on the first page", () => {
    render(<GamePagination currentPage={1} totalPages={10} />);

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();

    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();

    expect(screen.getByText("Page 1 of 10")).toBeInTheDocument();
  });

  it("disables the next button on the last page", () => {
    render(<GamePagination currentPage={10} totalPages={10} />);

    expect(screen.getByRole("button", { name: /previous/i })).toBeEnabled();

    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();

    expect(screen.getByText("Page 10 of 10")).toBeInTheDocument();
  });

  it("navigates to the next page", async () => {
    const user = userEvent.setup();

    render(<GamePagination currentPage={2} totalPages={10} />);

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(pushMock).toHaveBeenCalledWith("/games?page=3");
  });

  it("navigates to the previous page and removes page parameter on page 1", async () => {
    const user = userEvent.setup();

    searchParams.set("page", "2");
    searchParams.set("search", "zelda");

    render(<GamePagination currentPage={2} totalPages={10} />);

    await user.click(screen.getByRole("button", { name: /previous/i }));

    expect(pushMock).toHaveBeenCalledWith("/games?search=zelda");
  });
});

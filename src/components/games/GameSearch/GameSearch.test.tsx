import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameSearch } from "./GameSearch";

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

describe("GameSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    searchParams.delete("search");
    searchParams.delete("page");
  });

  it("updates the URL after the debounce period", () => {
    render(<GameSearch />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, {
      target: { value: "zelda" },
    });

    expect(pushMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(pushMock).toHaveBeenCalledWith("/games?search=zelda");
  });

  it("cancels the previous debounce when the search changes", () => {
    render(<GameSearch />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, {
      target: { value: "zel" },
    });

    act(() => {
      vi.advanceTimersByTime(400);
    });

    fireEvent.change(input, {
      target: { value: "zelda" },
    });

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(pushMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/games?search=zelda");
  });

  it("trims the search and resets the page", () => {
    searchParams.set("page", "3");

    render(<GameSearch />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, {
      target: { value: "  zelda  " },
    });

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(pushMock).toHaveBeenCalledWith("/games?search=zelda");
  });

  it("removes the search parameter when the value is only whitespace", () => {
    searchParams.set("search", "zelda");
    searchParams.set("page", "3");

    render(<GameSearch />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, {
      target: { value: "   " },
    });

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(pushMock).toHaveBeenCalledWith("/games");
  });
});

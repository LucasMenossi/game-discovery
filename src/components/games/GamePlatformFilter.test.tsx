import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GamePlatformFilter } from "./GamePlatformFilter";

const pushMock = vi.fn();
const searchParams = new URLSearchParams();

const platforms = [
  { id: 4, name: "PC", slug: "pc" },
  { id: 187, name: "PlayStation 5", slug: "playstation5" },
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

describe("GamePlatformFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParams.delete("platform");
    searchParams.delete("page");
  });

  it("renders all platforms as the default selection", () => {
    render(<GamePlatformFilter platforms={platforms} />);

    expect(screen.getByRole("combobox")).toHaveTextContent("All platforms");
  });

  it("updates the URL when a platform is selected", async () => {
    const user = userEvent.setup();

    render(<GamePlatformFilter platforms={platforms} />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByRole("option", { name: "PC" })).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "PC" }));

    expect(pushMock).toHaveBeenCalledWith("/games?platform=4");
  });

  it("removes the platform and page parameters when all platforms is selected", async () => {
    const user = userEvent.setup();

    searchParams.set("platform", "4");
    searchParams.set("page", "3");

    render(<GamePlatformFilter platforms={platforms} />);

    await user.click(screen.getByRole("combobox"));

    await user.click(screen.getByRole("option", { name: "All platforms" }));

    expect(pushMock).toHaveBeenCalledWith("/games");
  });
});

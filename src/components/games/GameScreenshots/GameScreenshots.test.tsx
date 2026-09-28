import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GameScreenshots } from "./GameScreenshots";

const screenshots = [
  {
    id: 1,
    image: "https://example.com/screenshot-1.jpg",
    width: 1920,
    height: 1080,
    is_deleted: false,
  },
  {
    id: 2,
    image: "https://example.com/screenshot-2.jpg",
    width: 1920,
    height: 1080,
    is_deleted: false,
  },
];

vi.mock("next/image", () => ({
  default: (props: React.ComponentProps<"img">) => (
    <img {...props} alt={props.alt} />
  ),
}));

describe("GameScreenshots", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when there are no screenshots", () => {
    const { container } = render(<GameScreenshots screenshots={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders all screenshots", () => {
    render(<GameScreenshots screenshots={screenshots} />);

    expect(
      screen.getByRole("button", { name: "View screenshot 1" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "View screenshot 2" }),
    ).toBeInTheDocument();
  });

  it("opens the screenshot preview", async () => {
    const user = userEvent.setup();

    render(<GameScreenshots screenshots={screenshots} />);

    await user.click(screen.getByRole("button", { name: "View screenshot 1" }));

    expect(
      screen.getByRole("dialog", { name: "Screenshot preview" }),
    ).toBeInTheDocument();
  });

  it("does not render the close button before the image loads", async () => {
    const user = userEvent.setup();

    render(<GameScreenshots screenshots={screenshots} />);

    await user.click(screen.getByRole("button", { name: "View screenshot 1" }));

    expect(
      screen.queryByRole("button", {
        name: "Close screenshot preview",
      }),
    ).not.toBeInTheDocument();
  });

  it("focuses the close button after the image loads", async () => {
    const user = userEvent.setup();

    render(<GameScreenshots screenshots={screenshots} />);

    await user.click(screen.getByRole("button", { name: "View screenshot 1" }));

    const dialog = screen.getByRole("dialog", {
      name: "Screenshot preview",
    });

    const image = within(dialog).getByAltText("Game screenshot 1");

    fireEvent.load(image);

    const closeButton = await screen.findByRole("button", {
      name: "Close screenshot preview",
    });

    expect(closeButton).toHaveFocus();
  });

  it("closes the preview when the close button is clicked", async () => {
    const user = userEvent.setup();

    render(<GameScreenshots screenshots={screenshots} />);

    await user.click(screen.getByRole("button", { name: "View screenshot 1" }));

    const dialog = screen.getByRole("dialog", {
      name: "Screenshot preview",
    });

    const image = within(dialog).getByAltText("Game screenshot 1");

    fireEvent.load(image);

    const closeButton = await screen.findByRole("button", {
      name: "Close screenshot preview",
    });

    await user.click(closeButton);

    expect(
      screen.queryByRole("dialog", { name: "Screenshot preview" }),
    ).not.toBeInTheDocument();
  });

  it("closes the preview when Escape is pressed", async () => {
    const user = userEvent.setup();

    render(<GameScreenshots screenshots={screenshots} />);

    await user.click(screen.getByRole("button", { name: "View screenshot 1" }));

    const dialog = screen.getByRole("dialog", {
      name: "Screenshot preview",
    });

    const image = within(dialog).getByAltText("Game screenshot 1");

    fireEvent.load(image);

    await screen.findByRole("button", {
      name: "Close screenshot preview",
    });

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: "Screenshot preview" }),
    ).not.toBeInTheDocument();
  });

  it("returns focus to the trigger button when the preview closes", async () => {
    const user = userEvent.setup();

    render(<GameScreenshots screenshots={screenshots} />);

    const trigger = screen.getByRole("button", {
      name: "View screenshot 1",
    });

    await user.click(trigger);

    const dialog = screen.getByRole("dialog", {
      name: "Screenshot preview",
    });

    const image = within(dialog).getByAltText("Game screenshot 1");

    fireEvent.load(image);

    const closeButton = await screen.findByRole("button", {
      name: "Close screenshot preview",
    });

    await user.click(closeButton);

    expect(trigger).toHaveFocus();
  });

  it("closes the preview when the backdrop is clicked", async () => {
    const user = userEvent.setup();

    render(<GameScreenshots screenshots={screenshots} />);

    await user.click(screen.getByRole("button", { name: "View screenshot 1" }));

    const dialog = screen.getByRole("dialog", {
      name: "Screenshot preview",
    });

    const image = within(dialog).getByAltText("Game screenshot 1");

    fireEvent.load(image);

    await user.click(dialog);

    expect(
      screen.queryByRole("dialog", { name: "Screenshot preview" }),
    ).not.toBeInTheDocument();
  });
});

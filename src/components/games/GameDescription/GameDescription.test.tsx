import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GameDescription } from "./GameDescription";

vi.mock("@/lib/getEnglishDescription", () => ({
  getEnglishDescription: (description: string) =>
    description
      .split("\n\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
}));

describe("GameDescription", () => {
  it("renders the complete description when it has three or fewer paragraphs", () => {
    const description = [
      "First paragraph.",
      "Second paragraph.",
      "Third paragraph.",
    ].join("\n\n");

    render(<GameDescription description={description} />);

    expect(screen.getByText("First paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Third paragraph.")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show more" }),
    ).not.toBeInTheDocument();
  });

  it("shows only the first three paragraphs when the description is long", () => {
    const description = [
      "First paragraph.",
      "Second paragraph.",
      "Third paragraph.",
      "Fourth paragraph.",
    ].join("\n\n");

    render(<GameDescription description={description} />);

    expect(screen.getByText("First paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Third paragraph.")).toBeInTheDocument();
    expect(screen.queryByText("Fourth paragraph.")).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Show more" }),
    ).toBeInTheDocument();
  });

  it("expands the complete description when show more is clicked", async () => {
    const user = userEvent.setup();

    const description = [
      "First paragraph.",
      "Second paragraph.",
      "Third paragraph.",
      "Fourth paragraph.",
    ].join("\n\n");

    render(<GameDescription description={description} />);

    await user.click(screen.getByRole("button", { name: "Show more" }));

    expect(screen.getByText("Fourth paragraph.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("collapses the description when show less is clicked", async () => {
    const user = userEvent.setup();

    const description = [
      "First paragraph.",
      "Second paragraph.",
      "Third paragraph.",
      "Fourth paragraph.",
    ].join("\n\n");

    render(<GameDescription description={description} />);

    await user.click(screen.getByRole("button", { name: "Show more" }));

    await user.click(screen.getByRole("button", { name: "Show less" }));

    expect(screen.queryByText("Fourth paragraph.")).not.toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Show more" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("renders nothing when the description has no paragraphs", () => {
    render(<GameDescription description="" />);

    expect(
      screen.queryByRole("heading", { name: "Description" }),
    ).not.toBeInTheDocument();
  });
});

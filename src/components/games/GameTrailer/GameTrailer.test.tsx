import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { GameMovie } from "@/lib/rawg/movies";

import { GameTrailer } from "./GameTrailer";

const movie: GameMovie = {
  id: 1,
  name: "Official Trailer",
  preview: "https://example.com/trailer-preview.jpg",
  data: {
    "480": "https://example.com/trailer.mp4",
    max: "https://example.com/trailer.mp4",
  },
};

describe("GameTrailer", () => {
  it("renders the trailer preview", () => {
    render(<GameTrailer movie={movie} />);

    expect(
      screen.getByRole("heading", { name: "Official Trailer" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Play Official Trailer" }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("Official Trailer")).toBeInTheDocument();
  });

  it("plays the trailer when the play button is clicked", async () => {
    const user = userEvent.setup();

    render(<GameTrailer movie={movie} />);

    await user.click(
      screen.getByRole("button", { name: "Play Official Trailer" }),
    );

    const video = document.querySelector<HTMLVideoElement>("video");

    expect(video).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Play Official Trailer" }),
    ).not.toBeInTheDocument();
  });

  it("renders the video with the correct attributes", async () => {
    const user = userEvent.setup();

    render(<GameTrailer movie={movie} />);

    await user.click(
      screen.getByRole("button", { name: "Play Official Trailer" }),
    );

    const video = document.querySelector<HTMLVideoElement>("video");

    expect(video).toBeInTheDocument();

    expect(video).toHaveAttribute("src", movie.data.max);
    expect(video).toHaveAttribute("poster", movie.preview);
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("aria-label", "Official Trailer trailer");
  });
});

"use client";

import Image from "next/image";
import { useState } from "react";

import type { GameScreenshot } from "@/lib/rawg/screenshots";

type GameScreenshotsProps = {
  screenshots: GameScreenshot[];
};

export function GameScreenshots({ screenshots }: GameScreenshotsProps) {
  const availableScreenshots = screenshots.filter(
    (screenshot) => !screenshot.is_deleted,
  );

  const [selectedScreenshot, setSelectedScreenshot] =
    useState<GameScreenshot | null>(null);

  if (availableScreenshots.length === 0) {
    return null;
  }

  return (
    <>
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Screenshots</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {availableScreenshots.map((screenshot) => (
            <button
              key={screenshot.id}
              type="button"
              aria-label="Open screenshot"
              onClick={() => setSelectedScreenshot(screenshot)}
              className="overflow-hidden rounded-lg text-left cursor-pointer"
            >
              <Image
                src={screenshot.image}
                alt="Game screenshot"
                width={screenshot.width}
                height={screenshot.height}
                className="w-full object-cover transition-transform hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {selectedScreenshot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setSelectedScreenshot(null)}
        >
          <div
            className="relative max-h-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedScreenshot.image}
              alt="Game screenshot"
              width={selectedScreenshot.width}
              height={selectedScreenshot.height}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
            />

            <button
              type="button"
              onClick={() => setSelectedScreenshot(null)}
              className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-2 text-xl text-white cursor-pointer"
              aria-label="Close screenshot"
            >
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}

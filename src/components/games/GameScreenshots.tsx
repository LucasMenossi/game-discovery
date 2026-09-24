"use client";

import Image from "next/image";
import { X } from "lucide-react";
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
              aria-label={`Open screenshot ${screenshot.id}`}
              onClick={() => setSelectedScreenshot(screenshot)}
              className="group cursor-zoom-in overflow-hidden rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Image
                src={screenshot.image}
                alt="Game screenshot"
                width={screenshot.width}
                height={screenshot.height}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {selectedScreenshot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
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
              aria-label="Close screenshot"
              onClick={() => setSelectedScreenshot(null)}
              className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

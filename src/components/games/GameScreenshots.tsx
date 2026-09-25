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

  const handleClose = () => {
    setSelectedScreenshot(null);
  };

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
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
          onClick={handleClose}
        >
          <button
            type="button"
            aria-label="Close screenshot"
            onClick={handleClose}
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="size-5" />
          </button>

          <div
            className="max-h-[90vh] max-w-[90vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedScreenshot.image}
              alt="Game screenshot"
              width={selectedScreenshot.width}
              height={selectedScreenshot.height}
              sizes="90vw"
              className="h-auto max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

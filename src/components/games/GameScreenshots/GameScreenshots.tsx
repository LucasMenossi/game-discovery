"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { GameScreenshot } from "@/lib/rawg/screenshots";

type GameScreenshotsProps = {
  screenshots: GameScreenshot[];
};

export function GameScreenshots({ screenshots }: GameScreenshotsProps) {
  const [selectedScreenshot, setSelectedScreenshot] =
    useState<GameScreenshot | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function handleOpen(screenshot: GameScreenshot, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setImageLoaded(false);
    setSelectedScreenshot(screenshot);
  }

  function handleClose() {
    setSelectedScreenshot(null);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!selectedScreenshot || !imageLoaded) {
      return;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedScreenshot, imageLoaded]);

  if (!screenshots.length) {
    return null;
  }

  return (
    <>
      <section aria-labelledby="screenshots-heading">
        <h2 id="screenshots-heading" className="mb-4 text-2xl font-semibold">
          Screenshots
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {screenshots.map((screenshot) => (
            <button
              key={screenshot.id}
              type="button"
              onClick={(event) => handleOpen(screenshot, event.currentTarget)}
              className="group overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`View screenshot ${screenshot.id}`}
            >
              <Image
                src={screenshot.image}
                alt={`Game screenshot ${screenshot.id}`}
                width={640}
                height={360}
                className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {selectedScreenshot && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="relative max-h-full max-w-5xl">
            <Image
              src={selectedScreenshot.image}
              alt={`Game screenshot ${selectedScreenshot.id}`}
              width={1920}
              height={1080}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              onLoad={() => setImageLoaded(true)}
            />

            {imageLoaded && (
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="absolute right-2 top-2 z-10 rounded-md bg-black/70 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close screenshot preview"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

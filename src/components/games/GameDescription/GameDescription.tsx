"use client";

import { useState } from "react";

import { getEnglishDescription } from "@/lib/getEnglishDescription";

type GameDescriptionProps = {
  description: string;
};

const VISIBLE_PARAGRAPHS = 3;

export function GameDescription({ description }: GameDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const paragraphs = getEnglishDescription(description);
  const hasMore = paragraphs.length > VISIBLE_PARAGRAPHS;

  if (paragraphs.length === 0) {
    return null;
  }

  const visibleParagraphs = expanded
    ? paragraphs
    : paragraphs.slice(0, VISIBLE_PARAGRAPHS);

  return (
    <section className="mt-8" aria-labelledby="description-heading">
      <h2 id="description-heading" className="text-xl font-semibold">
        Description
      </h2>

      <div className="mt-4 space-y-4 leading-8 text-muted-foreground">
        {visibleParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          className="mt-3 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </section>
  );
}

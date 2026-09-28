"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

import type { GameMovie } from "@/lib/rawg/movies";

type GameTrailerProps = {
  movie: GameMovie;
};

export function GameTrailer({ movie }: GameTrailerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="mt-10" aria-labelledby="trailer-heading">
      <h2 id="trailer-heading" className="text-xl font-semibold">
        {movie.name}
      </h2>

      <div className="relative mt-4 aspect-video overflow-hidden rounded-lg bg-black">
        {isPlaying ? (
          <video
            src={movie.data.max}
            controls
            autoPlay
            poster={movie.preview}
            aria-label={`${movie.name} trailer`}
            className="size-full object-contain"
          />
        ) : (
          <button
            type="button"
            aria-label={`Play ${movie.name}`}
            onClick={() => setIsPlaying(true)}
            className="group relative block size-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Image
              src={movie.preview}
              alt={movie.name}
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
              <span className="flex size-16 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform group-hover:scale-105">
                <Play className="ml-1 size-7 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

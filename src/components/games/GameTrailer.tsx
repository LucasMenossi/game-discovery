"use client";

import { useState } from "react";

import type { GameMovie } from "@/lib/rawg/movies";
import Image from "next/image";

type GameTrailerProps = {
  movie: GameMovie;
};

export function GameTrailer({ movie }: GameTrailerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">{movie.name}</h2>

      <div className="relative mt-4 overflow-hidden rounded-lg bg-black">
        {isPlaying ? (
          <video
            src={movie.data.max}
            controls
            autoPlay
            poster={movie.preview}
            className="aspect-video w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group relative block w-full"
          >
            <Image
              src={movie.preview}
              alt={movie.name}
              width={1280}
              height={720}
              className="aspect-video w-full object-cover"
            />

            <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-black">
                ▶
              </span>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

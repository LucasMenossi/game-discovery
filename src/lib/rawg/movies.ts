import { RAWG_CACHE, rawgFetch } from "./client";

export type GameMovie = {
  id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
};

type GameMoviesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: GameMovie[];
};

export function getGameMovies(gameId: number) {
  return rawgFetch<GameMoviesResponse>(
    `/games/${gameId}/movies`,
    {},
    {
      revalidate: RAWG_CACHE.dynamic,
    },
  );
}

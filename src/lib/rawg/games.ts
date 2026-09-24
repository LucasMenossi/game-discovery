import { rawgFetch } from "./client";

type GetGamesParams = {
  page?: number;
  page_size?: number;
  search?: string;
  genres?: string;
  platforms?: string;
  dates?: string;
  metacritic?: string;
  ordering?: string;
};

export type Game = {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  background_image: string | null;
  rating: number;
  metacritic: number | null;
};

type GamesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
};

export const GAMES_PAGE_SIZE = 10;

export function getGames(params: GetGamesParams = {}) {
  return rawgFetch<GamesResponse>(
    "/games",
    {
      page_size: GAMES_PAGE_SIZE,
      ...params,
    },
    {
      revalidate: 300,
    },
  );
}

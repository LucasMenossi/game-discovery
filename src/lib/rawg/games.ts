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

export type GameDetails = {
  id: number;
  slug: string;
  name: string;
  description_raw: string;
  released: string | null;
  background_image: string | null;
  rating: number;
  metacritic: number | null;
  website: string | null;

  genres: {
    id: number;
    name: string;
    slug: string;
  }[];

  developers: {
    id: number;
    name: string;
    slug: string;
  }[];

  publishers: {
    id: number;
    name: string;
    slug: string;
  }[];

  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
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

export function getGame(slug: string) {
  return rawgFetch<GameDetails>(
    `/games/${slug}`,
    {},
    {
      revalidate: 300,
    },
  );
}

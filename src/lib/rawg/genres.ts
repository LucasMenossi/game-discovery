import { RAWG_CACHE, rawgFetch } from "./client";

export type Genre = {
  id: number;
  slug: string;
  name: string;
  games_count: number;
  image_background: string;
};

type GenresResponse = {
  count: number;
  results: Genre[];
};

export function getGenres() {
  return rawgFetch<GenresResponse>(
    "/genres",
    {
      page_size: 50,
    },
    {
      revalidate: RAWG_CACHE.stable,
    },
  );
}

export function getGenre(slug: string) {
  return rawgFetch<Genre>(
    `/genres/${encodeURIComponent(slug)}`,
    {},
    {
      revalidate: RAWG_CACHE.stable,
    },
  );
}

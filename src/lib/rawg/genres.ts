import { rawgFetch } from "./client";

export type Genre = {
  id: number;
  slug: string;
  name: string;
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
      revalidate: 3600,
    },
  );
}

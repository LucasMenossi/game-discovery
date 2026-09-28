import { RAWG_CACHE, rawgFetch } from "./client";

export type Platform = {
  id: number;
  slug: string;
  name: string;
  games_count: number;
  image_background: string | null;
};

type PlatformsResponse = {
  count: number;
  results: Platform[];
};

export function getPlatforms() {
  return rawgFetch<PlatformsResponse>(
    "/platforms",
    {
      page_size: 50,
    },
    {
      revalidate: RAWG_CACHE.stable,
    },
  );
}

export function getPlatform(slug: string) {
  return rawgFetch<Platform>(
    `/platforms/${encodeURIComponent(slug)}`,
    {},
    {
      revalidate: RAWG_CACHE.stable,
    },
  );
}

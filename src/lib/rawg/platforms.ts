import { rawgFetch } from "./client";

export type Platform = {
  id: number;
  slug: string;
  name: string;
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
      revalidate: 3600,
    },
  );
}

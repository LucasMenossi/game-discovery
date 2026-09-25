import type { MetadataRoute } from "next";

import { getGames } from "@/lib/rawg/games";
import { siteUrl } from "@/lib/site";

const SITEMAP_GAME_LIMIT = 50;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { results } = await getGames({
    page_size: SITEMAP_GAME_LIMIT,
    ordering: "-added",
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl.toString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: new URL("/games", siteUrl).toString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const gameRoutes: MetadataRoute.Sitemap = results.map((game) => ({
    url: new URL(`/games/${game.slug}`, siteUrl).toString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...gameRoutes];
}

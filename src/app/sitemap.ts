import type { MetadataRoute } from "next";

import { getGames } from "@/lib/rawg/games";
import { getGenres } from "@/lib/rawg/genres";
import { getPlatforms } from "@/lib/rawg/platforms";
import { siteUrl } from "@/lib/site";

const SITEMAP_GAME_LIMIT = 50;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ results: games }, { results: genres }, { results: platforms }] =
    await Promise.all([
      getGames({
        page_size: SITEMAP_GAME_LIMIT,
        ordering: "-added",
      }),
      getGenres(),
      getPlatforms(),
    ]);

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
    {
      url: new URL("/genres", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: new URL("/platforms", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const genreRoutes: MetadataRoute.Sitemap = genres.map((genre) => ({
    url: new URL(`/genres/${genre.slug}`, siteUrl).toString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const platformRoutes: MetadataRoute.Sitemap = platforms.map((platform) => ({
    url: new URL(`/platforms/${platform.slug}`, siteUrl).toString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const gameRoutes: MetadataRoute.Sitemap = games.map((game) => ({
    url: new URL(`/games/${game.slug}`, siteUrl).toString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...genreRoutes, ...platformRoutes, ...gameRoutes];
}

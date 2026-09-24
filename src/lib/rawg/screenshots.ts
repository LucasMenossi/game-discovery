import { RAWG_CACHE, rawgFetch } from "./client";

export type GameScreenshot = {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
};

type GameScreenshotsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: GameScreenshot[];
};

export function getGameScreenshots(gameId: number) {
  return rawgFetch<GameScreenshotsResponse>(
    `/games/${gameId}/screenshots`,
    {},
    {
      revalidate: RAWG_CACHE.dynamic,
    },
  );
}

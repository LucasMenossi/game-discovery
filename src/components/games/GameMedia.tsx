import { getGameMovies } from "@/lib/rawg/movies";
import { getGameScreenshots } from "@/lib/rawg/screenshots";

import { GameScreenshots } from "./GameScreenshots";
import { GameTrailer } from "./GameTrailer";

type GameMediaProps = {
  gameId: number;
};

export async function GameMedia({ gameId }: GameMediaProps) {
  const [screenshots, movies] = await Promise.all([
    getGameScreenshots(gameId),
    getGameMovies(gameId),
  ]);

  return (
    <>
      <GameScreenshots screenshots={screenshots.results} />

      {movies.results.length > 0 && <GameTrailer movie={movies.results[0]} />}
    </>
  );
}

import { getGameSeries } from "@/lib/rawg/games";

import { GameCard } from "../GameCard/GameCard";

type RelatedGamesProps = {
  gameId: number;
};

export async function RelatedGames({ gameId }: RelatedGamesProps) {
  const { results } = await getGameSeries(gameId);

  const relatedGames = results.filter((game) => game.id !== gameId).slice(0, 6);

  if (relatedGames.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 border-t pt-8">
      <h2 className="text-xl font-semibold">Related Games</h2>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {relatedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}

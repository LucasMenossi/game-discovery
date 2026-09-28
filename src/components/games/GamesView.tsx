import { GameEmptyState } from "@/components/games/GameEmptyState";
import { GameGenreFilter } from "@/components/games/GameGenreFilter";
import { GamePlatformFilter } from "@/components/games/GamePlatformFilter";
import { GameSort } from "@/components/games/GameSort";
import { GameCard } from "@/components/games/GameCard/GameCard";
import type { Genre } from "@/lib/rawg/genres";
import type { Platform } from "@/lib/rawg/platforms";
import type { Game } from "@/lib/rawg/games";
import { GameDateFilter } from "./GameDateFilter";
import { GameMetacriticFilter } from "./GameMetacriticFilter";
import { GameSearch } from "./GameSearch";

type GamesViewProps = {
  games: Game[];
  count: number;
  genres: Genre[];
  platforms: Platform[];
};

export function GamesView({ games, count, genres, platforms }: GamesViewProps) {
  return (
    <>
      <GameSearch />
      <div className="mb-8 flex flex-wrap gap-3">
        <GameGenreFilter genres={genres} />
        <GamePlatformFilter platforms={platforms} />
        <GameDateFilter />
        <GameMetacriticFilter />
        <GameSort />
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        {count.toLocaleString("en-US")} games found
      </div>

      {games.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game, index) => (
            <GameCard key={game.id} game={game} preload={index === 0} />
          ))}
        </section>
      ) : (
        <GameEmptyState />
      )}
    </>
  );
}

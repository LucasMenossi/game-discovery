import { GameCard } from "@/components/games/GameCard";
import { getGames } from "@/lib/rawg/games";

export default async function Home() {
  const data = await getGames();

  return (
    <main>
      <h1>Game Discovery</h1>

      <section>
        {data.results.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </section>
    </main>
  );
}

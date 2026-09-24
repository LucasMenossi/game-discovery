import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/lib/rawg/games";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.slug}`} className="block">
      <article className="overflow-hidden rounded-lg border bg-white shadow-sm">
        {game.background_image && (
          <Image
            src={game.background_image}
            alt={game.name}
            width={640}
            height={360}
            className="aspect-video w-full object-cover"
          />
        )}

        <div className="p-4">
          <h2 className="text-lg font-semibold">{game.name}</h2>

          <div className="mt-2 flex gap-4 text-sm text-gray-600">
            <span>⭐ {game.rating}</span>

            {game.released && (
              <span>{new Date(game.released).getFullYear()}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

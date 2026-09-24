import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import type { Game } from "@/lib/rawg/games";
import { Star } from "lucide-react";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="group h-full overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/games/${game.slug}`} className="block h-full">
        {game.background_image ? (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center bg-muted text-sm text-muted-foreground">
            No image available
          </div>
        )}

        <CardContent className="p-4">
          <CardTitle className="line-clamp-2">{game.name}</CardTitle>

          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Star className="size-4 fill-current" />
              {game.rating.toFixed(2)}
            </span>

            {game.released && (
              <span>{new Date(game.released).getFullYear()}</span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

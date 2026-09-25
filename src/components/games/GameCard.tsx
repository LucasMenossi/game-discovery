import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import type { Game } from "@/lib/rawg/games";

type GameCardProps = {
  game: Game;
  preload?: boolean;
};

export function GameCard({ game, preload = false }: GameCardProps) {
  return (
    <Card className="group h-full overflow-hidden p-0 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/games/${game.slug}`} className="block h-full">
        {game.background_image ? (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              preload={preload}
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
          <CardTitle className="min-h-10 line-clamp-2 text-base leading-5">
            {game.name}
          </CardTitle>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 font-medium">
              <Star className="size-3.5 fill-current" />
              {game.rating.toFixed(2)}
            </span>

            {game.released && (
              <>
                <span className="text-muted-foreground">•</span>

                <span className="text-muted-foreground">
                  {new Date(game.released).getFullYear()}
                </span>
              </>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

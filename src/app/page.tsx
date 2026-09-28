import Link from "next/link";
import { Search } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GameCard } from "@/components/games/GameCard/GameCard";

import { getGames } from "@/lib/rawg/games";
import { getGenres } from "@/lib/rawg/genres";
import { getPlatforms } from "@/lib/rawg/platforms";

export const metadata = {
  title: "Game Discovery",
  description:
    "Discover games, explore popular titles, and find your next favorite game.",
};

export default async function HomePage() {
  const [popularGames, recentGames, genres, platforms] = await Promise.all([
    getGames({
      ordering: "-rating",
      page: 1,
    }),
    getGames({
      ordering: "-released",
      page: 1,
    }),
    getGenres(),
    getPlatforms(),
  ]);

  return (
    <main>
      <section className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Discover your next favorite game
          </h1>

          <p className="text-muted-foreground mt-6 max-w-2xl text-lg">
            Explore thousands of games, discover popular titles, and find
            something new to play.
          </p>

          <form
            action="/games"
            method="get"
            className="mx-auto mt-8 flex w-full max-w-2xl items-center gap-2"
          >
            <div className="relative flex-1">
              <Search
                className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                aria-hidden="true"
              />

              <Input
                name="search"
                type="search"
                placeholder="Search for a game..."
                className="h-11 pl-9"
                aria-label="Search for a game"
              />
            </div>

            <Button type="submit" className="h-11">
              Search
            </Button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Popular games</h2>
            <p className="text-muted-foreground mt-1">
              Highly rated games worth checking out.
            </p>
          </div>

          <Link
            href="/games?sort=-rating"
            className={buttonVariants({ variant: "outline" })}
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {popularGames.results.slice(0, 5).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Recently released</h2>
              <p className="text-muted-foreground mt-1">
                Check out some of the latest releases.
              </p>
            </div>

            <Link
              href="/games?sort=-released"
              className={buttonVariants({ variant: "outline" })}
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {recentGames.results.slice(0, 5).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Explore by genre</h2>
          <p className="text-muted-foreground mt-1">
            Find games based on what you like to play.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {genres.results.slice(0, 12).map((genre) => (
            <Link
              key={genre.id}
              href={`/games?genre=${encodeURIComponent(genre.slug)}`}
            >
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardContent className="flex h-full items-center justify-center p-5 text-center">
                  <span className="font-medium">{genre.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Explore by platform</h2>
            <p className="text-muted-foreground mt-1">
              Browse games available on your favorite platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {platforms.results.slice(0, 12).map((platform) => (
              <Link key={platform.id} href={`/games?platform=${platform.id}`}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardContent className="flex h-full items-center justify-center p-5 text-center">
                    <span className="font-medium">{platform.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">
          Can&apos;t find what you&apos;re looking for?
        </h2>

        <p className="text-muted-foreground mx-auto mt-3 max-w-xl">
          Browse the complete catalog and use filters, sorting, and search to
          find exactly what you want.
        </p>

        <Link
          href="/games"
          className={buttonVariants({ size: "lg", className: "mt-6" })}
        >
          Explore all games
        </Link>
      </section>
    </main>
  );
}

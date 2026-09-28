import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { GameCard } from "@/components/games/GameCard/GameCard";
import { buttonVariants } from "@/components/ui/button";
import { getGames } from "@/lib/rawg/games";
import { getGenre, getGenres } from "@/lib/rawg/genres";

const PAGE_SIZE = 20;

type GenrePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: GenrePageProps): Promise<Metadata> {
  const { slug } = await params;
  const genre = await getGenre(slug);

  if (!genre) {
    return { title: "Genre not found | Game Discovery" };
  }

  return {
    title: `${genre.name} Games | Game Discovery`,
    description: `Discover ${genre.name} games and find your next favorite game.`,
    alternates: {
      canonical: `/genres/${genre.slug}`,
    },
    openGraph: {
      title: `${genre.name} Games | Game Discovery`,
      description: `Discover ${genre.name} games and find your next favorite game.`,
      type: "website",
      images: genre.image_background ? [genre.image_background] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const { results } = await getGenres();

  return results.map((genre) => ({
    slug: genre.slug,
  }));
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { slug } = await params;
  const genre = await getGenre(slug);

  if (!genre) {
    notFound();
  }

  const games = await getGames({
    genres: genre.slug,
    ordering: "-rating",
    page_size: PAGE_SIZE,
  });

  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0">
          <Image
            src={genre.image_background}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-white/70">Genre</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {genre.name}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Explore {genre.games_count.toLocaleString()} games in the {genre.name.toLowerCase()} genre.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Popular {genre.name} games</h2>
            <p className="text-muted-foreground mt-1">
              Highly rated games in this genre.
            </p>
          </div>

          <Link
            href={`/games?genre=${encodeURIComponent(genre.slug)}`}
            className={buttonVariants({ variant: "outline" })}
          >
            View full catalog
          </Link>
        </div>

        {games.results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {games.results.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-12 text-center">
            No games were found for this genre.
          </p>
        )}
      </section>
    </main>
  );
}

import { GameMedia } from "@/components/games/GameMedia";
import { GameMediaSkeleton } from "@/components/games/GameMediaSkeleton";
import { getEnglishDescription } from "@/lib/formatters";
import { RawgApiError } from "@/lib/rawg/client";
import { getGame } from "@/lib/rawg/games";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Star } from "lucide-react";

type GameDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getGameOrNotFound(slug: string) {
  try {
    return await getGame(slug);
  } catch (error) {
    if (error instanceof RawgApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export async function generateMetadata({
  params,
}: GameDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameOrNotFound(slug);

  return {
    title: `${game.name} | Game Discovery`,
    description: `Discover information about ${game.name}.`,
    alternates: {
      canonical: `/games/${game.slug}`,
    },
    openGraph: {
      title: `${game.name} | Game Discovery`,
      description: `Discover information about ${game.name}.`,
      url: `/games/${game.slug}`,
      siteName: "Game Discovery",
      type: "website",
      images: game.background_image
        ? [
            {
              url: game.background_image,
              alt: game.name,
            },
          ]
        : undefined,
    },
  };
}

export default async function GameDetailsPage({
  params,
}: GameDetailsPageProps) {
  const { slug } = await params;
  const game = await getGameOrNotFound(slug);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-bold tracking-tight">{game.name}</h1>

      {game.background_image && (
        <Image
          src={game.background_image}
          alt={game.name}
          className="mt-6 aspect-video w-full rounded-lg object-cover"
          width={640}
          height={360}
          sizes="(min-width: 1024px) 1024px, 100vw"
          priority
        />
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1 font-medium text-foreground">
          <Star className="size-4 fill-current" />
          {game.rating.toFixed(2)}
        </span>

        {game.metacritic !== null && <span>Metacritic: {game.metacritic}</span>}

        {game.released && (
          <span>Released: {new Date(game.released).getFullYear()}</span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {game.genres.map((genre) => (
          <span
            key={genre.id}
            className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
          >
            {genre.name}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {game.platforms.map(({ platform }) => (
          <span
            key={platform.id}
            className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
          >
            {platform.name}
          </span>
        ))}
      </div>

      <p className="mt-8 leading-7 text-muted-foreground">
        {getEnglishDescription(game.description_raw)}
      </p>

      <Suspense fallback={<GameMediaSkeleton />}>
        <GameMedia gameId={game.id} />
      </Suspense>

      <div className="mt-10 grid gap-8 border-t pt-8 sm:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold">Developers</h2>

          <ul className="mt-3 space-y-1 text-muted-foreground">
            {game.developers.map((developer) => (
              <li key={developer.id}>{developer.name}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Publishers</h2>

          <ul className="mt-3 space-y-1 text-muted-foreground">
            {game.publishers.map((publisher) => (
              <li key={publisher.id}>{publisher.name}</li>
            ))}
          </ul>
        </section>
      </div>

      {game.website && (
        <div className="mt-10 border-t pt-8">
          <h2 className="text-xl font-semibold">Official Website</h2>

          <a
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-primary hover:underline"
          >
            Visit official website
          </a>
        </div>
      )}
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RawgApiError } from "@/lib/rawg/RawgApiError";

import { GameCard } from "@/components/games/GameCard/GameCard";
import { buttonVariants } from "@/components/ui/button";
import { getGames } from "@/lib/rawg/games";
import { getPlatform, getPlatforms } from "@/lib/rawg/platforms";

const PAGE_SIZE = 20;

async function getPlatformOrNotFound(slug: string) {
  try {
    return await getPlatform(slug);
  } catch (error) {
    if (error instanceof RawgApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

type PlatformPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = await getPlatformOrNotFound(slug);

  return {
    title: `${platform.name} Games | Game Discovery`,
    description: `Discover ${platform.name} games and find your next favorite game.`,
    alternates: {
      canonical: `/platforms/${platform.slug}`,
    },
    openGraph: {
      title: `${platform.name} Games | Game Discovery`,
      description: `Discover ${platform.name} games and find your next favorite game.`,
      type: "website",
      images: platform.image_background
        ? [platform.image_background]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const { results } = await getPlatforms();

  return results.map((platform) => ({
    slug: platform.slug,
  }));
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { slug } = await params;
  const platform = await getPlatformOrNotFound(slug);

  const games = await getGames({
    platforms: String(platform.id),
    ordering: "-rating",
    page_size: PAGE_SIZE,
  });

  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0">
          {platform.image_background && (
            <Image
              src={platform.image_background}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-white/70">Platform</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {platform.name}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Explore {platform.games_count.toLocaleString()} games available on{" "}
            {platform.name}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Popular {platform.name} games
            </h2>
            <p className="mt-1 text-muted-foreground">
              Highly rated games available on this platform.
            </p>
          </div>

          <Link
            href={`/games?platform=${platform.id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            View full catalog
          </Link>
        </div>

        {games.results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {games.results.map((game, index) => (
              <GameCard key={game.id} game={game} preload={index === 0} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            No games were found for this platform.
          </p>
        )}
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Star } from "lucide-react";

import { AppBreadcrumb } from "@/components/AppBreadCrumb";
import { GameMedia } from "@/components/games/GameMedia";
import { GameMediaSkeleton } from "@/components/games/GameMediaSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RawgApiError } from "@/lib/rawg/client";
import { getGame } from "@/lib/rawg/games";
import { getEnglishDescription } from "@/lib/formatters";
import { siteUrl } from "@/lib/site";
import { RelatedGamesSkeleton } from "@/components/games/RelatedGamesSkeleton";
import { RelatedGames } from "@/components/games/RelatedGames";

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

  const description =
    getEnglishDescription(game.description_raw)[0]?.slice(0, 160) ??
    `Discover information about ${game.name}.`;

  return {
    title: `${game.name} | Game Discovery`,
    description,
    alternates: {
      canonical: `/games/${game.slug}`,
    },
    openGraph: {
      title: `${game.name} | Game Discovery`,
      description,
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
    twitter: {
      card: "summary_large_image",
      title: `${game.name} | Game Discovery`,
      description,
      images: game.background_image ? [game.background_image] : undefined,
    },
  };
}

export default async function GameDetailsPage({
  params,
}: GameDetailsPageProps) {
  const { slug } = await params;
  const game = await getGameOrNotFound(slug);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Games", href: "/games" },
    { label: game.name },
  ];

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: new URL(item.href, siteUrl).toString(),
      }),
    })),
  };

  const gameStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.name,
    url: new URL(`/games/${game.slug}`, siteUrl).toString(),
    description: game.description_raw,
    ...(game.background_image && {
      image: game.background_image,
    }),
    ...(game.released && {
      datePublished: game.released,
    }),
    ...(game.genres.length > 0 && {
      genre: game.genres.map((genre) => genre.name),
    }),
    ...(game.platforms.length > 0 && {
      gamePlatform: game.platforms.map(({ platform }) => platform.name),
    }),
    ...(game.developers.length > 0 && {
      creator: game.developers.map((developer) => ({
        "@type": "Organization",
        name: developer.name,
      })),
    }),
    ...(game.publishers.length > 0 && {
      publisher: game.publishers.map((publisher) => ({
        "@type": "Organization",
        name: publisher.name,
      })),
    }),
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameStructuredData),
        }}
      />

      <div className="mb-8">
        <AppBreadcrumb items={breadcrumbItems} />
      </div>

      <h1 className="text-4xl font-bold tracking-tight">{game.name}</h1>

      {game.background_image && (
        <Image
          src={game.background_image}
          alt={game.name}
          className="mt-6 aspect-video w-full rounded-lg object-cover"
          width={1024}
          height={576}
          sizes="(min-width: 1024px) 1024px, 100vw"
          priority
        />
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1 font-medium text-foreground">
          <Star className="size-4 fill-current" />
          {game.rating.toFixed(2)}
        </span>

        {game.metacritic !== null && (
          <span>
            Metacritic:{" "}
            <span className="font-medium text-foreground">
              {game.metacritic}
            </span>
          </span>
        )}

        {game.released && (
          <span>
            Released:{" "}
            <span className="font-medium text-foreground">
              {new Date(game.released).getFullYear()}
            </span>
          </span>
        )}

        {game.esrb_rating && (
          <span>
            ESRB:{" "}
            <span className="font-medium text-foreground">
              {game.esrb_rating.name}
            </span>
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
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

      <div className="mt-8 space-y-4 leading-8 text-muted-foreground">
        {getEnglishDescription(game.description_raw).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {game.tags.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Tags</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {game.tags.slice(0, 12).map((tag) => (
              <span
                key={tag.id}
                className="rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </section>
      )}

      <Suspense fallback={<GameMediaSkeleton />}>
        <GameMedia gameId={game.id} />
      </Suspense>

      <Suspense fallback={<RelatedGamesSkeleton />}>
        <RelatedGames gameId={game.id} />
      </Suspense>

      <section className="mt-10 border-t pt-8">
        <Card>
          <CardHeader>
            <CardTitle>Game Information</CardTitle>
          </CardHeader>

          <CardContent>
            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {game.released && (
                <div>
                  <dt className="text-sm text-muted-foreground">
                    Release date
                  </dt>
                  <dd className="mt-1 font-medium">
                    {new Date(game.released).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-sm text-muted-foreground">Genres</dt>
                <dd className="mt-1 font-medium">
                  {game.genres.map((genre) => genre.name).join(", ")}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-muted-foreground">Platforms</dt>
                <dd className="mt-1 font-medium">
                  {game.platforms
                    .map(({ platform }) => platform.name)
                    .join(", ")}
                </dd>
              </div>

              {game.esrb_rating && (
                <div>
                  <dt className="text-sm text-muted-foreground">Age rating</dt>
                  <dd className="mt-1 font-medium">{game.esrb_rating.name}</dd>
                </div>
              )}

              {game.developers.length > 0 && (
                <div>
                  <dt className="text-sm text-muted-foreground">Developers</dt>
                  <dd className="mt-1 font-medium">
                    {game.developers
                      .map((developer) => developer.name)
                      .join(", ")}
                  </dd>
                </div>
              )}

              {game.publishers.length > 0 && (
                <div>
                  <dt className="text-sm text-muted-foreground">Publishers</dt>
                  <dd className="mt-1 font-medium">
                    {game.publishers
                      .map((publisher) => publisher.name)
                      .join(", ")}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </section>

      {game.website && (
        <section className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold">Official Website</h2>

          <a
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-primary hover:underline"
          >
            Visit official website
          </a>
        </section>
      )}
    </main>
  );
}

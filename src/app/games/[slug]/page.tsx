import { getEnglishDescription } from "@/lib/formatters";
import { getGame } from "@/lib/rawg/games";
import Image from "next/image";
import type { Metadata } from "next";

type GameDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: GameDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const game = await getGame(slug);

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

  const game = await getGame(slug);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-bold">{game.name}</h1>

      {game.background_image && (
        <Image
          src={game.background_image}
          alt={game.name}
          className="mt-6 aspect-video w-full rounded-lg object-cover"
          width={640}
          height={360}
        />
      )}

      <div className="mt-6 flex gap-6 text-sm text-gray-600">
        <span>⭐ {game.rating}</span>

        {game.metacritic !== null && <span>Metacritic: {game.metacritic}</span>}

        {game.released && (
          <span>Released: {new Date(game.released).getFullYear()}</span>
        )}
      </div>

      <p className="mt-8 whitespace-pre-line text-gray-700">
        {getEnglishDescription(game.description_raw)}
      </p>
    </main>
  );
}

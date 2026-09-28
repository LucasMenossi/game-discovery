import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { getPlatforms } from "@/lib/rawg/platforms";

export const metadata = {
  title: "Platforms | Game Discovery",
  description: "Explore games by platform and discover your next favorite game.",
};

export default async function PlatformsPage() {
  const { results: platforms } = await getPlatforms();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Explore by platform
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Browse games by platform and find something to play on your favorite
          system.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {platforms.map((platform) => (
          <Link
            key={platform.id}
            href={`/platforms/${platform.slug}`}
            className="group"
          >
            <Card className="relative h-48 overflow-hidden py-0 transition-transform duration-200 group-hover:-translate-y-1">
              {platform.image_background ? (
                <Image
                  src={platform.image_background}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-muted" />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

              <CardContent className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                <h2 className="text-lg font-semibold">{platform.name}</h2>
                <p className="mt-1 text-sm text-white/75">
                  {platform.games_count.toLocaleString()} games
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

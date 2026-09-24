import { GameGenreFilter } from "@/components/games/GameGenreFilter";
import { GameSearch } from "@/components/games/GameSearch";
import { GameSort } from "@/components/games/GameSort";
import { GameCard } from "@/components/games/GameCard";
import { GamePagination } from "@/components/games/GamePagination";
import { GAMES_PAGE_SIZE, getGames } from "@/lib/rawg/games";
import { getGenres } from "@/lib/rawg/genres";
import { GamePlatformFilter } from "@/components/games/GamePlatformFilter";
import { getPlatforms } from "@/lib/rawg/platforms";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type GamesPageProps = {
  searchParams: Promise<{
    search?: string;
    genre?: string;
    platform?: string;
    sort?: string;
    dates?: string;
    metacritic?: string;
    page?: string;
  }>;
};

function parsePage(value?: string) {
  if (!value) {
    return 1;
  }

  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

export async function generateMetadata({
  searchParams,
}: GamesPageProps): Promise<Metadata> {
  const params = await searchParams;

  const search = params.search?.trim();

  const title = search
    ? `${search} — Games | Game Discovery`
    : "Games | Game Discovery";

  const description = search
    ? `Discover games matching "${search}".`
    : "Discover and explore video games by genre, platform, rating, and more.";

  return {
    title,
    description,
    alternates: {
      canonical: "/games",
    },
    openGraph: {
      title,
      description,
      url: "/games",
      siteName: "Game Discovery",
      type: "website",
    },
  };
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const params = await searchParams;

  const currentPage = parsePage(params.page);

  const [data, genres, platforms] = await Promise.all([
    getGames({
      search: params.search,
      genres: params.genre,
      platforms: params.platform,
      ordering: params.sort,
      dates: params.dates,
      metacritic: params.metacritic,
      page: currentPage,
    }),
    getGenres(),
    getPlatforms(),
  ]);

  const totalPages = Math.ceil(data.count / GAMES_PAGE_SIZE);

  if (currentPage > totalPages && totalPages > 0) {
    const newParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (key !== "page" && value !== undefined) {
        newParams.set(key, value);
      }
    }

    newParams.set("page", String(totalPages));

    redirect(`/games?${newParams.toString()}`);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Games</h1>

      <GameSearch />

      <div className="mb-8 flex flex-wrap gap-3">
        <GameGenreFilter genres={genres.results} />
        <GamePlatformFilter platforms={platforms.results} />
        <GameSort />
      </div>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.results.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </section>

      <GamePagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}

import { GamePagination } from "@/components/games/GamePagination";
import { GAMES_PAGE_SIZE, getGames } from "@/lib/rawg/games";
import { getGenres } from "@/lib/rawg/genres";
import { getPlatforms } from "@/lib/rawg/platforms";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { GamesView } from "@/components/games/GamesView";
import { AppBreadcrumb } from "@/components/AppBreadCrumb";

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
      <div className="mb-8">
        <AppBreadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Games" }]}
        />
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Discover games</h1>

        <p className="mt-2 text-muted-foreground">
          Explore games by genre, platform, rating, and more.
        </p>
      </div>

      <GamesView
        games={data.results}
        count={data.count}
        genres={genres.results}
        platforms={platforms.results}
      />

      <GamePagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Genre } from "@/lib/rawg/genres";
import { updateSearchParams } from "@/lib/url";

type GameGenreFilterProps = {
  genres: Genre[];
};

export function GameGenreFilter({ genres }: GameGenreFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedGenre = searchParams.get("genre") ?? "";

  function handleChange(value: string) {
    const params = updateSearchParams(searchParams, {
      genre: value || null,
      page: null,
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={selectedGenre}
      onChange={(event) => handleChange(event.target.value)}
      className="rounded-md border px-3 py-2"
    >
      <option value="">All genres</option>

      {genres.map((genre) => (
        <option key={genre.id} value={genre.slug}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Genre } from "@/lib/rawg/genres";
import { updateSearchParams } from "@/lib/updateSearchParams";

type GameGenreFilterProps = {
  genres: Genre[];
};

export function GameGenreFilter({ genres }: GameGenreFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requestedGenre = searchParams.get("genre");
  const selectedGenre =
    requestedGenre && genres.some((genre) => genre.slug === requestedGenre)
      ? requestedGenre
      : "all";

  function handleChange(value: string | null) {
    const params = updateSearchParams(searchParams, {
      genre: value === "all" || value === null ? null : value,
      page: null,
    });

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  const selectedGenreName =
    selectedGenre === "all"
      ? "All genres"
      : genres.find((genre) => genre.slug === selectedGenre)?.name;

  return (
    <Select value={selectedGenre} onValueChange={handleChange}>
      <SelectTrigger className="w-45" aria-label="Filter by genre">
        <SelectValue>{selectedGenreName}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All genres</SelectItem>

        {genres.map((genre) => (
          <SelectItem key={genre.id} value={genre.slug}>
            {genre.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

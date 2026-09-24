"use client";

import { updateSearchParams } from "@/lib/url";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "", label: "Default" },
  { value: "-rating", label: "Rating: High to Low" },
  { value: "rating", label: "Rating: Low to High" },
  { value: "-metacritic", label: "Metacritic: High to Low" },
  { value: "metacritic", label: "Metacritic: Low to High" },
  { value: "-released", label: "Release Date: Newest" },
  { value: "released", label: "Release Date: Oldest" },
  { value: "name", label: "Name: A–Z" },
  { value: "-name", label: "Name: Z–A" },
];

export function GameSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "";

  function handleChange(value: string) {
    const params = updateSearchParams(searchParams, {
      sort: value || null,
      page: null,
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2">
      <span className="text-sm font-medium">Sort by</span>

      <select
        value={sort}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-md border px-3 py-2"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

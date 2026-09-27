"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateSearchParams } from "@/lib/updateSearchParams";

const sortOptions = [
  { value: "default", label: "Default Sorting" },
  { value: "-rating", label: "Rating: High to Low" },
  { value: "rating", label: "Rating: Low to High" },
  { value: "-metacritic", label: "Metacritic: High to Low" },
  { value: "metacritic", label: "Metacritic: Low to High" },
  { value: "-released", label: "Release Date: Newest" },
  { value: "released", label: "Release Date: Oldest" },
  { value: "-added", label: "Popularity: High to Low" },
  { value: "added", label: "Popularity: Low to High" },
  { value: "name", label: "Name: A-Z" },
  { value: "-name", label: "Name: Z-A" },
];

export function GameSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requestedSort = searchParams.get("sort");
  const sort =
    requestedSort &&
    sortOptions.some((option) => option.value === requestedSort)
      ? requestedSort
      : "default";

  function handleChange(value: string | null) {
    const params = updateSearchParams(searchParams, {
      sort: value === "default" || value === null ? null : value,
      page: null,
    });

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  const selectedOption = sortOptions.find((option) => option.value === sort);

  return (
    <Select value={sort} onValueChange={handleChange}>
      <SelectTrigger className="w-55" aria-label="Sort games">
        <SelectValue>{selectedOption?.label}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

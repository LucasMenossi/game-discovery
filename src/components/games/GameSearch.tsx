"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateSearchParams } from "@/lib/url";

export function GameSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const value = search.trim();

      if (value === urlSearch) {
        return;
      }

      const params = updateSearchParams(searchParams, {
        search: value || null,
        page: null,
      });

      router.push(`/games?${params.toString()}`);
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, urlSearch, searchParams, router]);

  return (
    <input
      type="search"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Search games..."
      className="mb-8 w-full rounded-md border px-4 py-2"
    />
  );
}

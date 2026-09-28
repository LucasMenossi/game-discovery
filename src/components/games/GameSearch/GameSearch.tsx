"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { updateSearchParams } from "@/lib/updateSearchParams";

export function GameSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(urlSearch);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSearchRef = useRef<string | null>(null);

  useEffect(() => {
    if (pendingSearchRef.current === null) {
      setSearch(urlSearch);
    }

    if (pendingSearchRef.current === urlSearch) {
      pendingSearchRef.current = null;
    }
  }, [urlSearch]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setSearch(value);
    pendingSearchRef.current = value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;

      const nextSearch = value.trim();

      const params = updateSearchParams(searchParams, {
        search: nextSearch || null,
        page: null,
      });

      const query = params.toString();

      router.push(query ? `/games?${query}` : "/games");
    }, 800);
  }

  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        type="search"
        placeholder="Search games..."
        className="h-11 pl-9"
        value={search}
        onChange={handleChange}
        aria-label="Search games"
      />
    </div>
  );
}

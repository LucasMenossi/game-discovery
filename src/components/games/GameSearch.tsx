"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { updateSearchParams } from "@/lib/updateSearchParams";

export function GameSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const urlSearch = searchParams.get("search") ?? "";

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== urlSearch) {
      inputRef.current.value = urlSearch;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
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

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;

      const search = value.trim();

      const params = updateSearchParams(searchParams, {
        search: search || null,
        page: null,
      });

      router.push(`/games?${params.toString()}`);
    }, 800);
  }

  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        ref={inputRef}
        type="search"
        placeholder="Search games..."
        className="h-11 pl-9"
        onChange={handleChange}
      />
    </div>
  );
}

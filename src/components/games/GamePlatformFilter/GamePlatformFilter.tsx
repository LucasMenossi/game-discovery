"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Platform } from "@/lib/rawg/platforms";

import { updateSearchParams } from "@/lib/updateSearchParams";

type GamePlatformFilterProps = {
  platforms: Platform[];
};

export function GamePlatformFilter({ platforms }: GamePlatformFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requestedPlatform = searchParams.get("platform");
  const selectedPlatform =
    requestedPlatform &&
    platforms.some((platform) => String(platform.id) === requestedPlatform)
      ? requestedPlatform
      : "all";

  function handleChange(value: string | null) {
    const params = updateSearchParams(searchParams, {
      platform: value === "all" || value === null ? null : value,
      page: null,
    });

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  const selectedPlatformName =
    selectedPlatform === "all"
      ? "All platforms"
      : platforms.find((platform) => String(platform.id) === selectedPlatform)
          ?.name;

  return (
    <Select value={selectedPlatform} onValueChange={handleChange}>
      <SelectTrigger className="w-45" aria-label="Filter by platform">
        <SelectValue>{selectedPlatformName}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All platforms</SelectItem>

        {platforms.map((platform) => (
          <SelectItem key={platform.id} value={String(platform.id)}>
            {platform.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

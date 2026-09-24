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

import { updateSearchParams } from "@/lib/url";

type GamePlatformFilterProps = {
  platforms: Platform[];
};

export function GamePlatformFilter({ platforms }: GamePlatformFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPlatform = searchParams.get("platform") ?? "all";

  function handleChange(value: string | null) {
    const params = updateSearchParams(searchParams, {
      platform: value === "all" || value === null ? null : value,
      page: null,
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  const selectedPlatformName =
    selectedPlatform === "all"
      ? "All platforms"
      : platforms.find((platform) => String(platform.id) === selectedPlatform)
          ?.name;

  return (
    <Select value={selectedPlatform} onValueChange={handleChange}>
      <SelectTrigger className="w-45">
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

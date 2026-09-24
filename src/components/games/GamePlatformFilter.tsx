"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Platform } from "@/lib/rawg/platforms";
import { updateSearchParams } from "@/lib/url";

type GamePlatformFilterProps = {
  platforms: Platform[];
};

export function GamePlatformFilter({ platforms }: GamePlatformFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPlatform = searchParams.get("platform") ?? "";

  function handleChange(value: string) {
    const params = updateSearchParams(searchParams, {
      platform: value || null,
      page: null,
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={selectedPlatform}
      onChange={(event) => handleChange(event.target.value)}
      className="rounded-md border px-3 py-2"
    >
      <option value="">All platforms</option>

      {platforms.map((platform) => (
        <option key={platform.id} value={platform.id}>
          {platform.name}
        </option>
      ))}
    </select>
  );
}

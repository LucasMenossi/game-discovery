"use client";

import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function GameEmptyState() {
  const router = useRouter();
  const pathname = usePathname();

  function handleClearFilters() {
    router.push(pathname);
  }

  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <SlidersHorizontal className="size-5 text-muted-foreground" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">No games found</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        We couldn&apos;t find any games matching your current search and
        filters. Try adjusting them or clear everything to start over.
      </p>

      <Button
        type="button"
        variant="outline"
        className="mt-5"
        onClick={handleClearFilters}
      >
        Clear all filters
      </Button>
    </div>
  );
}

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { updateSearchParams } from "@/lib/url";

type GamePaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function GamePagination({
  currentPage,
  totalPages,
}: GamePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    const params = updateSearchParams(searchParams, {
      page: page === 1 ? null : String(page),
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-4"
    >
      <Button
        type="button"
        variant="outline"
        disabled={!canGoPrevious}
        onClick={() => goToPage(currentPage - 1)}
      >
        <ChevronLeft />
        Previous
      </Button>

      <span className="min-w-24 text-center text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        type="button"
        variant="outline"
        disabled={!canGoNext}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
        <ChevronRight />
      </Button>
    </nav>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
    <nav className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={!canGoPrevious}
        onClick={() => goToPage(currentPage - 1)}
        className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        disabled={!canGoNext}
        onClick={() => goToPage(currentPage + 1)}
        className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}

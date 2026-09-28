"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSearchParams } from "@/lib/updateSearchParams";

const dateOptions = [
  { value: "all", label: "All release dates" },
  { value: "2026-01-01,2026-12-31", label: "Released in 2026" },
  { value: "2025-01-01,2025-12-31", label: "Released in 2025" },
  { value: "2024-01-01,2024-12-31", label: "Released in 2024" },
  { value: "2020-01-01,2024-12-31", label: "Released 2020-2024" },
];

export function GameDateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedValue = searchParams.get("dates");
  const value =
    requestedValue &&
    dateOptions.some((option) => option.value === requestedValue)
      ? requestedValue
      : "all";

  function handleChange(nextValue: string | null) {
    if (!nextValue) return;

    const params = updateSearchParams(searchParams, {
      dates: nextValue === "all" ? null : nextValue,
      page: null,
    });

    router.push(`/games?${params.toString()}`);
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-45" aria-label="Filter by release date">
        <SelectValue>
          {value === "all"
            ? "All release dates"
            : dateOptions.find((option) => option.value === value)?.label}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {dateOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

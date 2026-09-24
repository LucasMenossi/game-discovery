"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSearchParams } from "@/lib/url";

const metacriticOptions = [
  { value: "all", label: "All Metacritic scores" },
  { value: "90,100", label: "90-100" },
  { value: "80,89", label: "80-89" },
  { value: "70,79", label: "70-79" },
  { value: "60,69", label: "60-69" },
];

export function GameMetacriticFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = searchParams.get("metacritic") ?? "all";

  function handleChange(nextValue: string | null) {
    if (!nextValue) return;

    const params = updateSearchParams(searchParams, {
      metacritic: nextValue === "all" ? null : nextValue,
      page: null,
    });

    router.push(`/games?${params.toString()}`);
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-45">
        <SelectValue>
          {value === "all"
            ? "All Metacritic scores"
            : metacriticOptions.find((option) => option.value === value)?.label}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {metacriticOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

"use client";

import { Button } from "@/components/ui/button";

type GamesErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GamesError({ reset }: GamesErrorProps) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex min-h-100 flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>

        <p className="mt-2 text-muted-foreground">
          We couldn&apos;t load the games. Please try again.
        </p>

        <Button type="button" className="mt-6" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}

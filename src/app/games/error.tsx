"use client";

type GamesErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GamesError({ reset }: GamesErrorProps) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>

        <p className="mt-2 text-gray-600">We couldn&apos;t load the games.</p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-md bg-black px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

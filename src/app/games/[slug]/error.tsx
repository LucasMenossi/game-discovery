"use client";

type GameDetailsErrorProps = {
  reset: () => void;
};

export default function GameDetailsError({ reset }: GameDetailsErrorProps) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex min-h-100 flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>

        <p className="mt-2 text-gray-600">We couldn&apos;t load this game.</p>

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

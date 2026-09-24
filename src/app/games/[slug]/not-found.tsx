import Link from "next/link";

export default function GameNotFound() {
  return (
    <main className="mx-auto flex min-h-125 max-w-5xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">Game not found</h1>

      <p className="mt-3 text-gray-600">
        We couldn&apos;t find the game you&apos;re looking for.
      </p>

      <Link
        href="/games"
        className="mt-6 rounded-md bg-black px-4 py-2 text-white"
      >
        Browse games
      </Link>
    </main>
  );
}

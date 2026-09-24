import Link from "next/link";

export default function GameNotFound() {
  return (
    <main className="mx-auto flex min-h-125 max-w-5xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">Game not found</h1>

      <p className="mt-3 text-muted-foreground">
        We couldn&apos;t find the game you&apos;re looking for.
      </p>

      <Link
        href="/games"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Browse games
      </Link>
    </main>
  );
}

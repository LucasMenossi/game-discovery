import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          Game Discovery
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2">
          <Link
            href="/games"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Games
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

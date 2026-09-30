import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            Game Discovery
          </Link>

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/games"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Games
              </Link>

              <Link
                href="/genres"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Genres
              </Link>

              <Link
                href="/platforms"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Platforms
              </Link>
            </div>

            <div className="ml-1 border-l pl-2">
              <Link
                href="https://github.com/LucasMenossi/game-discovery"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View project source on GitHub"
                className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-5 fill-current"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.465-1.11-1.465-.908-.621.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.413-.012 2.741 0 .268.18.58.688.481A10.002 10.002 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
                </svg>
              </Link>
            </div>

            <ThemeToggle />
          </div>
        </div>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1 overflow-x-auto pb-2 sm:hidden"
        >
          <Link
            href="/games"
            className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Games
          </Link>

          <Link
            href="/genres"
            className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Genres
          </Link>

          <Link
            href="/platforms"
            className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Platforms
          </Link>
        </nav>
      </div>
    </header>
  );
}

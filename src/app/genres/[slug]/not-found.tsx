import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function GenreNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Genre not found</h1>
      <p className="text-muted-foreground mt-3">
        The genre you are looking for does not exist.
      </p>
      <Link href="/genres" className={buttonVariants({ className: "mt-6" })}>
        Browse genres
      </Link>
    </main>
  );
}

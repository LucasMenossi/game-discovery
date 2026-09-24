export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <div className="h-9 w-56 animate-pulse rounded-md bg-muted" />
        <div className="mt-2 h-5 w-96 max-w-full animate-pulse rounded-md bg-muted" />
      </div>

      <div className="mb-8 h-11 w-full animate-pulse rounded-md bg-muted" />

      <div className="mb-8 flex flex-wrap gap-3">
        <div className="h-10 w-45 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-45 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-55 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="mb-4 h-4 w-32 animate-pulse rounded bg-muted" />

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border bg-card"
          >
            <div className="aspect-video animate-pulse bg-muted" />

            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </section>

      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
      </div>
    </main>
  );
}

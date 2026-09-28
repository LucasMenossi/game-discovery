export default function GenreLoading() {
  return (
    <main>
      <section className="h-80 animate-pulse bg-muted" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-3">
          <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-5 w-80 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-3/4 w-full animate-pulse rounded-xl bg-muted" />
              <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function PlatformLoading() {
  return (
    <main>
      <section className="h-80 animate-pulse bg-muted" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-3">
          <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-5 w-80 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className="aspect-video animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

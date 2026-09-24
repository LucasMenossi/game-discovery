export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Games</h1>

      <div className="mb-8 h-10 w-full animate-pulse rounded-md bg-gray-200" />

      <div className="mb-8 flex gap-3">
        <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200" />
        <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200" />
        <div className="h-10 w-40 animate-pulse rounded-md bg-gray-200" />
      </div>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border shadow-sm"
          >
            <div className="aspect-video animate-pulse bg-gray-200" />

            <div className="space-y-3 p-4">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

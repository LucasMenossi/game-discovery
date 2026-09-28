export default function GenresLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-3">
        <div className="h-10 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-6 w-full max-w-2xl animate-pulse rounded-md bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    </main>
  );
}

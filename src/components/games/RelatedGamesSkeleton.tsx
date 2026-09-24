export function RelatedGamesSkeleton() {
  return (
    <section className="mt-10 border-t pt-8">
      <div className="h-7 w-40 animate-pulse rounded bg-gray-200" />

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-video animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
    </section>
  );
}

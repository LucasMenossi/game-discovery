// src/components/games/GameMediaSkeleton.tsx

export function GameMediaSkeleton() {
  return (
    <div className="animate-pulse">
      <section className="mt-10">
        <div className="h-7 w-32 rounded bg-gray-200" />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="aspect-video rounded-lg bg-gray-200" />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="h-7 w-32 rounded bg-gray-200" />

        <div className="mt-4 aspect-video w-full rounded-lg bg-gray-200" />
      </section>
    </div>
  );
}

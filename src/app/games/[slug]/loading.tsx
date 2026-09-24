export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="h-10 w-2/3 animate-pulse rounded bg-gray-200" />

      <div className="mt-6 aspect-video w-full animate-pulse rounded-lg bg-gray-200" />

      <div className="mt-6 flex gap-6">
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mt-6 flex gap-2">
        <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200" />
        <div className="h-7 w-24 animate-pulse rounded-full bg-gray-200" />
        <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200" />
      </div>

      <div className="mt-4 flex gap-2">
        <div className="h-7 w-24 animate-pulse rounded-full bg-gray-200" />
        <div className="h-7 w-28 animate-pulse rounded-full bg-gray-200" />
        <div className="h-7 w-24 animate-pulse rounded-full bg-gray-200" />
      </div>

      <div className="mt-10 space-y-3">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="space-y-3">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-10">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="aspect-video animate-pulse rounded-lg bg-gray-200" />
          <div className="aspect-video animate-pulse rounded-lg bg-gray-200" />
          <div className="aspect-video animate-pulse rounded-lg bg-gray-200" />
          <div className="aspect-video animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>

      <div className="mt-10">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 aspect-video w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    </main>
  );
}

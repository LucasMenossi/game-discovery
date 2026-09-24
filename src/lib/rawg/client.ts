const RAWG_API_URL = "https://api.rawg.io/api";

export class RawgApiError extends Error {
  status: number;

  constructor(status: number) {
    super(`RAWG API error: ${status}`);

    this.name = "RawgApiError";
    this.status = status;
  }
}

type RawgFetchOptions = {
  signal?: AbortSignal;
  revalidate?: number;
};

export async function rawgFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {},
  options: RawgFetchOptions = {},
): Promise<T> {
  const searchParams = new URLSearchParams();

  searchParams.set("key", process.env.RAWG_API_KEY!);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const response = await fetch(
    `${RAWG_API_URL}${endpoint}?${searchParams.toString()}`,
    {
      signal: options.signal,
      next: options.revalidate
        ? {
            revalidate: options.revalidate,
          }
        : undefined,
    },
  );

  if (!response.ok) {
    throw new RawgApiError(response.status);
  }

  return response.json();
}

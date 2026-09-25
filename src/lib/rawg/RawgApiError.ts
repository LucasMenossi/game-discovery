export class RawgApiError extends Error {
  status: number;

  constructor(status: number) {
    super(`RAWG API error: ${status}`);

    this.name = "RawgApiError";
    this.status = status;
  }
}

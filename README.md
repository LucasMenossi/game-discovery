# Game Discovery

A game discovery platform built with **Next.js** and the **RAWG Video Games Database API**.

The project focuses on building a production-like frontend while demonstrating Next.js App Router, server/client components, URL state, API integration, caching, SEO, responsive UI, and testing.

## Features

- Game search and filtering
- Genre, platform, release date, rating, and sorting filters
- URL-synchronized filters and pagination
- Game detail pages with descriptions, screenshots, trailers, and related games
- Dynamic SEO metadata and Open Graph/Twitter metadata
- Responsive UI
- Loading, error, and not-found states
- RAWG data attribution

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vitest
- React Testing Library
- Playwright
- RAWG API

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
RAWG_API_KEY=your_rawg_api_key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

Run unit and component tests:

```bash
npm test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

## Architecture

The application uses the **Next.js App Router** with server-side data fetching for RAWG API requests. Client Components are used only where interactivity is required, such as search, filters, pagination, and media interactions.

Filters and pagination are stored in the URL, making catalog views shareable and preserving state across navigation.

RAWG requests use Next.js caching and revalidation with different lifetimes depending on how frequently the data changes.

### Cache strategy

- **Dynamic data: 5 minutes** — game lists, search results, game details, screenshots, trailers, and related games can change more frequently and should not remain stale for a long period.
- **Stable data: 1 hour** — genres and platforms change much less frequently, so a longer revalidation window avoids unnecessary requests while keeping the data reasonably fresh.

## API Attribution

Game data and images are provided by **RAWG**.

[RAWG](https://rawg.io/)

## License

This project is for educational and portfolio purposes.

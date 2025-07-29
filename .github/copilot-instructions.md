# Copilot Instructions for travel-buddy

## Project Overview

- **Framework:** SvelteKit (Svelte 5, runes API)
- **Database:** SQLite, managed via Drizzle ORM
- **Language:** TypeScript throughout
- **UI:** shadcn-svelte components, custom UI in `src/lib/components/ui`

## Architecture & Data Flow

- **src/lib/db/**: Drizzle ORM setup, schema (`schema.ts`), and DB instance (`index.ts`, `server.ts`).
- **src/lib/server/**: Server-side actions, one file per DB table, encapsulating business logic for that table.
- **src/lib/components/**: Shared and page-specific Svelte components. UI primitives in `ui/` (shadcn), other components outside `ui/`.
- **src/routes/**: SvelteKit routing for pages and endpoints. Use SvelteKit actions for form/DB interactions.
- **drizzle/**: Auto-generated DB migrations and snapshots.

## Key Conventions

- **File/Folder Naming:** Use kebab-case.
- **Imports:** Use absolute imports with .js extension for local js files (e.g., `import { db } from '$lib/db/server.js'`).
- **Types:** Prefer `type` over `interface`.
- **Component Structure:** Only create new components when needed; keep pages consistent and readable.
- **DB Schema:** Always consider DB schema when writing features; schema lives in `src/lib/db/schema.ts`.
- **Assets:** Place static assets in `src/lib/assets/`.

## Developer Workflows

- **Dev server:** `npm run dev` (or `bun run dev` if using Bun)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **DB Migrations:**
  - Generate: `bun run db:generate`
  - Apply: `bun run db:migrate`
  - Studio: `bun run db:studio`
- **Testing:** (Add details if/when tests are present)

## Integration Points

- **Drizzle ORM:** All DB access via Drizzle; import `db` from `$lib/db/server` for server-side queries.
- **SvelteKit Actions:** Use actions for form submissions and DB mutations.
- **shadcn-svelte:** Use for UI primitives; extend only as needed.

## Examples

- **DB Usage:**
  ```ts
  import { db } from '$lib/db/server';
  // ...use db for queries
  ```
- **Server Action:**
  ```ts
  // src/lib/server/trips.ts
  export async function createTrip(data: TripData) {
  	// ...insert into db
  }
  ```

## Additional Notes

- Keep code clean and well-structured; avoid over-engineering.
- Reference `src/lib/db/README.md` for DB setup and migration details.
- See `.cursor/rules/general.mdc` for further project-specific rules.

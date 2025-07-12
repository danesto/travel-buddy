# Database Setup

This project uses SQLite with Drizzle ORM for database management.

## Setup

The database is automatically initialized when the application starts. The SQLite database file will be created as `travel-buddy.db` in the project root.

## Usage

### Server-side (API routes, server actions)

```typescript
import { db } from '$lib/db/server';

// Use db for queries in server routes
```

### Database Management

- **Generate migrations**: `bun run db:generate`
- **Run migrations**: `bun run db:migrate`
- **Open Drizzle Studio**: `bun run db:studio`

## Schema

Database schema is defined in `src/lib/db/schema.ts`. Add your table definitions there and run `bun run db:generate` to create migrations.

## Files

- `src/lib/db/index.ts` - Main database configuration
- `src/lib/db/schema.ts` - Database schema definitions
- `src/lib/db/server.ts` - Server-side database instance
- `drizzle.config.ts` - Drizzle configuration 
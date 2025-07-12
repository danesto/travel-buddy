import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

// Create SQLite database instance
const sqlite = new Database('travel-buddy.db');

// Create Drizzle instance
export const db = drizzle({ client: sqlite });

// Run migrations
migrate(db, { migrationsFolder: './drizzle' });

export { sqlite };

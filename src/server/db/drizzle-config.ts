import { drizzle } from 'drizzle-orm/better-sqlite3';

// Set up but not fully tested
export const db = drizzle(process.env.DATABASE_URL as string);

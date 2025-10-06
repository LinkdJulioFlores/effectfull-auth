import { defineConfig } from 'drizzle-kit';

export const config = defineConfig({
  schema: './src/server/db/schema', // Points to a folder containing schema files
  dialect: 'sqlite',
});

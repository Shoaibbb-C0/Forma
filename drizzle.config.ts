import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/server/database/schema.ts',
  dialect: 'sqlite',
});

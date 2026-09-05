import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './backend/database/schema.ts',
  dialect: 'sqlite',
});

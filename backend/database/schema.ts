import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const content = sqliteTable(
  'content',
  {
    id: text('id').primaryKey(),
    kind: text('kind').notNull(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    category: text('category').notNull(),
    summary: text('summary').notNull(),
    image: text('image').notNull(),
    alt: text('alt').notNull(),
    body: text('body').notNull(),
    status: text('status').notNull(),
    updated_at: text('updated_at').notNull(),
  },
  (t) => [index('idx_content_status_kind').on(t.status, t.kind)],
);
export const enquiries = sqliteTable('enquiries', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  service: text('service').notNull(),
  location: text('location').notNull(),
  budget: text('budget').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  created_at: text('created_at').notNull(),
});
export const rateLimits = sqliteTable('rate_limits', {
  key: text('key').primaryKey(),
  count: integer('count').notNull(),
  expires: integer('expires').notNull(),
});
export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

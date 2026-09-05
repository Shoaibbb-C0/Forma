import { env } from 'cloudflare:workers';
import { Content, seedContent } from '@/src/content/seed-content';
export function database(): D1Database {
  return (env as unknown as { DB: D1Database }).DB;
}
export function runtime() {
  return env as unknown as { EDITOR_EMAILS?: string };
}
export async function initialize() {
  const db = database();
  const done = await db
    .prepare("SELECT value FROM settings WHERE key='seeded'")
    .first();
  if (done) return;
  await db.batch([
    ...seedContent.map((c) =>
      db
        .prepare(
          'INSERT OR IGNORE INTO content (id,kind,slug,title,category,summary,image,alt,body,status,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        )
        .bind(
          c.id,
          c.kind,
          c.slug,
          c.title,
          c.category,
          c.summary,
          c.image,
          c.alt,
          JSON.stringify(c.body),
          c.status,
          c.updated_at,
        ),
    ),
    db.prepare(
      "INSERT OR IGNORE INTO settings (key,value) VALUES ('seeded','1')",
    ),
  ]);
}
export async function listContent(
  kind?: string,
  all = false,
): Promise<Content[]> {
  await initialize();
  const rows = await database()
    .prepare(
      `SELECT * FROM content WHERE (? IS NULL OR kind=?) ${all ? '' : "AND status='published'"} ORDER BY updated_at DESC,id`,
    )
    .bind(kind ?? null, kind ?? null)
    .all();
  return rows.results.map((r) => ({
    ...r,
    body: JSON.parse(r.body as string),
  })) as Content[];
}
export async function getContent(slug: string, kind: string) {
  return (await listContent(kind)).find((x) => x.slug === slug);
}

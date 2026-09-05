import { getChatGPTUser } from '@/app/chatgpt-auth';
import { runtime, database } from '@/src/server/database/content-repository';
export async function editor() {
  const user = await getChatGPTUser();
  if (!user) return null;
  const allowed = (runtime().EDITOR_EMAILS ?? '')
    .split(',')
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(user.email.toLowerCase()) ? user : null;
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return origin === new URL(request.url).origin;
}
export async function rateLimit(request: Request, scope: string, max: number) {
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('oai-authenticated-user-id') ??
    'anonymous';
  const bytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${scope}:${ip}`),
  );
  const key = Array.from(new Uint8Array(bytes))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
  const now = Math.floor(Date.now() / 1000);
  const row = await database()
    .prepare(
      'INSERT INTO rate_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires<=? THEN 1 ELSE count+1 END, expires=CASE WHEN expires<=? THEN ? ELSE expires END RETURNING count',
    )
    .bind(key, now + 3600, now, now, now + 3600)
    .first<{ count: number }>();
  return !!row && row.count <= max;
}
export async function readBody(request: Request) {
  if (Number(request.headers.get('content-length') ?? 0) > 65536)
    throw new Error('Request is too large.');
  const body = await request.text();
  if (body.length > 65536) throw new Error('Request is too large.');
  return JSON.parse(body);
}
export function str(value: unknown, min: number, max: number, label: string) {
  if (
    typeof value !== 'string' ||
    value.trim().length < min ||
    value.trim().length > max
  )
    throw new Error(`${label} must contain ${min}–${max} characters.`);
  return value.trim();
}

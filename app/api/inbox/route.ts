import {
  editor,
  sameOrigin,
  readBody,
} from '@/src/server/http/request-security';
import { database } from '@/src/server/database/content-repository';
export async function POST(request: Request) {
  if (!sameOrigin(request) || !(await editor()))
    return Response.json({ error: 'Editor access required.' }, { status: 403 });
  try {
    const d = await readBody(request);
    if (
      !['new', 'read', 'archived'].includes(d.status) ||
      typeof d.id !== 'string'
    )
      return Response.json({ error: 'Invalid status.' }, { status: 400 });
    await database()
      .prepare('UPDATE enquiries SET status=? WHERE id=?')
      .bind(d.status, d.id)
      .run();
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: 'Could not update this enquiry.' },
      { status: 503 },
    );
  }
}

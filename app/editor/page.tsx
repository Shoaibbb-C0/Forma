import { requireChatGPTUser } from '@/app/chatgpt-auth';
import { editor } from '@/src/server/http/request-security';
import {
  listContent,
  database,
} from '@/src/server/database/content-repository';
import Editor from '@/src/features/studio/components/editor';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Studio Editor',
  robots: { index: false, follow: false },
};
export default async function EditorPage() {
  await requireChatGPTUser('/editor');
  const user = await editor();
  if (!user)
    return (
      <main id="main" className="wrap page-head">
        <p className="eyebrow">Protected studio space</p>
        <h1>Editor access required.</h1>
        <p>This signed-in account is not on the studio’s editor list.</p>
        <a
          className="text-link"
          href="/signout-with-chatgpt?return_to=%2Feditor"
          target="_top"
        >
          Use another account ↗
        </a>
      </main>
    );
  const content = await listContent(undefined, true);
  const inbox = await database()
    .prepare('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500')
    .all();
  return (
    <main id="main" className="wrap content-pad">
      <header className="page-head">
        <p className="eyebrow">Private / {user.email}</p>
        <h1>Studio Editor.</h1>
        <a
          href="/signout-with-chatgpt?return_to=%2F"
          target="_top"
          className="text-link"
        >
          Sign out ↗
        </a>
      </header>
      <Editor initial={content} inbox={inbox.results as any} />
    </main>
  );
}

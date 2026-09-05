import { Photo } from '@/src/components/site/site-sections';
import { listContent } from '@/src/server/database/content-repository';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Journal',
  description:
    'Notes on architecture, material choices and the spaces of everyday life.',
  alternates: { canonical: '/journal' },
};
export default async function Journal() {
  const items = await listContent('article');
  return (
    <main id="main" className="wrap content-pad">
      <header className="page-head">
        <p className="eyebrow">The Forma journal</p>
        <h1>Notes on space.</h1>
        <p>Observations, questions and ideas from the process of design.</p>
      </header>
      <div className="article-grid">
        {items.map((item) => (
          <a key={item.id} href={`/journal/${item.slug}`}>
            <Photo item={item} />
            <p className="eyebrow">
              {item.category} / {item.updated_at.slice(0, 10)}
            </p>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <span className="text-link">Read the note ↗</span>
          </a>
        ))}
      </div>
      {!items.length && <p>The next studio note is in progress.</p>}
    </main>
  );
}

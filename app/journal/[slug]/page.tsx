import { Photo, CTA } from '@/frontend/components/site/site-sections';
import { getContent } from '@/backend/database/content-repository';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getContent(slug, 'article');
  return {
    title: item?.title ?? 'Article not found',
    description: item?.summary,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title: item?.title,
      description: item?.summary,
      type: 'article',
    },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getContent(slug, 'article');
  if (!item) notFound();
  return (
    <main id="main">
      <header className="page-head wrap">
        <a href="/journal" className="eyebrow">
          ← Journal
        </a>
        <h1>{item.title}</h1>
        <p>{item.summary}</p>
        <p className="micro">
          {item.category} / Forma studio notes / {item.updated_at.slice(0, 10)}
        </p>
      </header>
      <figure className="story-image wrap">
        <Photo item={item} priority />
        <figcaption className="credit">
          Reference photography via Unsplash.
        </figcaption>
      </figure>
      <article className="story wrap">
        {item.body.map((s, i) => (
          <section key={i}>
            <h2>{s.heading}</h2>
            <p>{s.text}</p>
          </section>
        ))}
      </article>
      <CTA />
    </main>
  );
}

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
  const item = await getContent(slug, 'project');
  return {
    title: item?.title ?? 'Study not found',
    description: item?.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title: item?.title, description: item?.summary },
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getContent(slug, 'project');
  if (!item) notFound();
  return (
    <main id="main">
      <header className="page-head wrap">
        <a className="eyebrow" href="/work">
          ← All work
        </a>
        <h1>{item.title}</h1>
        <p>{item.summary}</p>
        <p className="micro">{item.category} / Concept study / Unbuilt</p>
      </header>
      <figure className="story-image wrap">
        <Photo item={item} priority />
        <figcaption className="credit">
          Reference photography via{' '}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash
          </a>
          . Illustrates design direction; does not depict a completed Forma
          project.
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

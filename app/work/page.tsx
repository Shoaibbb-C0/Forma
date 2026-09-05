import { ProjectCard, CTA } from '@/frontend/components/site/site-sections';
import { listContent } from '@/backend/database/content-repository';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Work',
  description:
    'Concept studies in residential architecture, interiors and commercial space.',
  alternates: { canonical: '/work' },
};
export default async function Work() {
  const items = await listContent('project');
  return (
    <main id="main">
      <header className="page-head wrap">
        <p className="eyebrow">Portfolio / Concept studies</p>
        <h1>Ideas made spatial.</h1>
        <p>
          Explorations of light, material and everyday life. Each study follows
          a question through to a considered design response.
        </p>
      </header>
      <section className="wrap content-pad">
        <div className="project-grid">
          {items.map((item, i) => (
            <ProjectCard item={item} index={i} key={item.id} />
          ))}
        </div>
        {!items.length && <p>New studies are taking shape. Check back soon.</p>}
        <p className="quiet micro">
          Concept studies, not completed client commissions. Photography is used
          as a spatial reference.
        </p>
      </section>
      <CTA />
    </main>
  );
}

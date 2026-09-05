import { CTA, Photo } from '@/src/components/site/site-sections';
import { photos } from '@/src/content/seed-content';
export const metadata = {
  title: 'Studio',
  description:
    'Forma’s approach: understand daily life, test spatial ideas and refine every decision.',
  alternates: { canonical: '/studio' },
};
export default function Studio() {
  return (
    <main id="main">
      <header className="page-head wrap">
        <p className="eyebrow">The studio / Our point of view</p>
        <h1>
          Less assumption.
          <br />
          More understanding.
        </h1>
        <p>
          Forma is an architecture and interiors studio concept built around a
          simple conviction: the thinking behind a space matters as much as the
          image of it.
        </p>
      </header>
      <figure className="story-image wrap">
        <Photo
          item={{
            image: photos.timber,
            alt: 'Timber interior showing the relationship between structure and daylight',
          }}
        />
        <figcaption className="credit">
          Material reference — Neon Wang / Unsplash. Not a photograph of the
          Forma studio.
        </figcaption>
      </figure>
      <section className="intro wrap ruled">
        <p className="eyebrow">A transparent practice</p>
        <div>
          <h2>
            The idea is only
            <br />
            the beginning.
          </h2>
          <p>
            Our studies make the process visible. They are explorations, not
            completed commissions. We use them to explain how a brief becomes a
            spatial proposition, and where further testing is needed.
          </p>
          <p>
            For a live project, scope, team, location requirements and delivery
            responsibilities begin with a conversation. Nothing is assumed from
            a portfolio image.
          </p>
        </div>
      </section>
      <section className="wrap content-pad">
        {[
          [
            'Listen',
            'Understand daily life, ambitions and the things that currently get in the way.',
          ],
          [
            'Question',
            'Identify the real spatial challenge and establish the priorities together.',
          ],
          [
            'Explore',
            'Test layouts, proportions and relationships before committing to an answer.',
          ],
          [
            'Refine',
            'Resolve material choices, light, junctions and the details that support the whole.',
          ],
          [
            'Coordinate',
            'Carry the intent forward through clear documentation and an agreed delivery process.',
          ],
        ].map(([t, p], i) => (
          <div className="service-row" key={t}>
            <span className="micro">0{i + 1}</span>
            <h2>{t}</h2>
            <p>{p}</p>
          </div>
        ))}
      </section>
      <CTA />
    </main>
  );
}

import Navigation from './navigation';
import { Content } from '@/frontend/content/seed-content';
export function Header() {
  return (
    <header className="header wrap">
      <a href="/" className="wordmark" aria-label="Forma home">
        forma<span>·</span>
      </a>
      <span className="brand-note">
        Architecture
        <br />& interiors
      </span>
      <Navigation />
    </header>
  );
}
export function Footer() {
  return (
    <footer className="wrap footer">
      <div className="footer-top">
        <a href="/" className="wordmark">
          forma<span>·</span>
        </a>
        <p>
          Considered spaces.
          <br />
          Everyday possibilities.
        </p>
        <a href="/enquire">Start a conversation ↗</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Forma</span>
        <span>Architecture / Interiors / Spatial thinking</span>
        <a href="/editor">Studio Editor ↗</a>
      </div>
    </footer>
  );
}
export function Photo({
  item,
  priority = false,
}: {
  item: Pick<Content, 'image' | 'alt'>;
  priority?: boolean;
}) {
  return (
    <img
      src={`${item.image}?auto=format&fit=crop&w=1600&q=85`}
      srcSet={[480, 800, 1200, 1800]
        .map((w) => `${item.image}?auto=format&fit=crop&w=${w}&q=80 ${w}w`)
        .join(',')}
      sizes="(max-width: 700px) 100vw, 70vw"
      alt={item.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      width="1600"
      height="1100"
    />
  );
}
export function ProjectCard({
  item,
  index = 0,
}: {
  item: Content;
  index?: number;
}) {
  return (
    <a className="project-card" href={`/work/${item.slug}`}>
      <div className="image-box">
        <Photo item={item} />
        <span className="image-index">F—0{index + 1}</span>
        <span className="image-arrow">↗</span>
      </div>
      <div className="project-meta">
        <h3>{item.title}</h3>
        <span>↗</span>
      </div>
      <p className="micro">
        {item.category} <span> / Concept study</span>
      </p>
    </a>
  );
}
export function CTA() {
  return (
    <section className="cta wrap">
      <p className="eyebrow">A place to begin</p>
      <div>
        <h2>
          What could your
          <br />
          space become?
        </h2>
        <a className="button" href="/enquire">
          Tell us about your project <span>↗</span>
        </a>
      </div>
    </section>
  );
}
export function HomeView({ projects }: { projects: Content[] }) {
  const first = projects[0];
  return (
    <main id="main">
      <section className="hero wrap">
        <div className="hero-label">
          <span className="eyebrow">
            <i /> Independent spatial thinking
          </span>
          <span className="micro">FORM / FUNCTION / FEELING</span>
        </div>
        <div className="hero-title">
          <h1>
            Spaces for the
            <br />
            way we <em>live.</em>
          </h1>
          <span className="hero-mark" aria-hidden="true">
            01
          </span>
        </div>
        <div className="hero-bottom">
          <p>
            Architecture and interiors shaped by everyday life.
            <br />
            Considered in detail. Grounded in purpose.
          </p>
          <a href="/work" className="text-link">
            Explore our work <span>↗</span>
          </a>
        </div>
        {first && (
          <a className="hero-image" href={`/work/${first.slug}`}>
            <Photo item={first} priority />
            <div className="hero-caption">
              <span>
                01 / {first.title}
                <small>{first.category} · Concept study</small>
              </span>
              <span className="round-arrow">↗</span>
            </div>
            <span className="vertical-label">
              A STUDY IN LIGHT, SPACE & STILLNESS
            </span>
          </a>
        )}
        <div className="image-foot micro">
          <span>FIG. 01 — SPACE TO BREATHE</span>
          <span>Reference photography / Unsplash</span>
        </div>
      </section>
      <section className="statement wrap">
        <p className="eyebrow">01 / The Forma approach</p>
        <div className="statement-copy">
          <h2>
            We do not begin
            <br />
            with a style.
          </h2>
          <div>
            <p>
              We begin with the small, specific things that make a space yours:
              the morning route, the view you return to, the work that needs a
              quieter corner, the table that brings people together.
            </p>
            <p>
              From there, we make a clear spatial proposition — one that can be
              tested, refined and carried through the details.
            </p>
            <a href="/studio" className="text-link">
              Inside the studio <span>↗</span>
            </a>
          </div>
        </div>
        <div className="principles" aria-label="Forma design principles">
          <span>
            <b>01</b> Notice what is already there.
          </span>
          <span>
            <b>02</b> Make room for what matters.
          </span>
          <span>
            <b>03</b> Let the detail hold the idea.
          </span>
        </div>
      </section>
      <section className="process-band">
        <div className="wrap process-grid">
          <p className="eyebrow">02 / A considered sequence</p>
          <div>
            <h2>
              From the first
              <br />
              question to the
              <br />
              <em>felt experience.</em>
            </h2>
            <p className="process-intro">
              A simple process makes stronger decisions possible. Each stage
              stays connected to the life the space is meant to hold.
            </p>
          </div>
          <ol>
            {[
              [
                'Context',
                'Observe the existing conditions, routines and opportunities.',
              ],
              [
                'Challenge',
                'Name what needs to change — without rushing to an answer.',
              ],
              [
                'Response',
                'Test an architectural idea through plan, light and material.',
              ],
              [
                'Experience',
                'Refine the details that shape how the space feels each day.',
              ],
            ].map(([title, text], i) => (
              <li key={title}>
                <span className="micro">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="work-section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / Selected explorations</p>
            <h2>Built around an idea.</h2>
          </div>
          <a href="/work" className="text-link">
            All work <span>↗</span>
          </a>
        </div>
        <div className="project-grid">
          {projects.slice(1).map((p, i) => (
            <ProjectCard key={p.id} item={p} index={i + 1} />
          ))}
        </div>
        <p className="micro quiet">
          Our portfolio presents concept studies. Reference imagery illustrates
          spatial and material direction.
        </p>
      </section>
      <section className="services-band">
        <div className="wrap service-inner">
          <p className="eyebrow">04 / Our disciplines</p>
          <div>
            {[
              'Residential architecture',
              'Interior design',
              'Commercial interiors',
            ].map((x, i) => (
              <a href="/services" key={x}>
                <span className="micro">0{i + 1}</span>
                <h3>{x}</h3>
                <span>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="closing-note wrap">
        <p className="eyebrow">A practice of attention</p>
        <p>
          Because a well-considered space does more than look resolved.
          <br />
          <em>It gives everyday life a better shape.</em>
        </p>
      </section>
      <CTA />
    </main>
  );
}

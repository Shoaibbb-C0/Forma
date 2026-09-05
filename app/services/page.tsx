import { CTA } from '@/frontend/components/site/site-sections';
export const metadata = {
  title: 'Services',
  description:
    'Residential architecture, interior design, commercial interiors and design coordination.',
  alternates: { canonical: '/services' },
};
const services = [
  [
    'Residential architecture',
    'Homes shaped around the routines, relationships and moments they need to support. We explore the brief, test spatial layouts and develop a coherent architectural concept.',
  ],
  [
    'Interior design',
    'A complete view of the interior: circulation, joinery, light, texture and the practical details that make a room work. Material direction supports how you want to live.',
  ],
  [
    'Commercial interiors',
    'Spaces for small businesses that make arrival, movement and daily work intuitive. We connect a clear spatial identity with practical operational needs.',
  ],
  [
    'Spatial planning & concepts',
    'For projects at the beginning of a decision. We identify what is not working, compare possible layouts and establish a design direction before detail takes over.',
  ],
  [
    'Design coordination',
    'Carrying the intent from concept into detail through clear communication and coordination. The scope, required specialists and delivery responsibilities are agreed for each project.',
  ],
];
export default function Services() {
  return (
    <main id="main">
      <header className="page-head wrap">
        <p className="eyebrow">Our disciplines</p>
        <h1>
          From the first question
          <br />
          to the finer detail.
        </h1>
        <p>
          A considered scope, shaped to your project. We begin by understanding
          what you need before deciding what to design.
        </p>
      </header>
      <section className="wrap content-pad">
        {services.map(([title, text], i) => (
          <div className="service-row" key={title}>
            <span className="micro">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </section>
      <CTA />
    </main>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import TransitionLink from "./TransitionLink";
import { asset, projects } from "../data/content";

const principles = [
  ["Context", "We look for the quiet logic of a site before giving it form."],
  [
    "Material",
    "Natural materials bring tactility, memory and the possibility of ageing well.",
  ],
  [
    "Light",
    "Daylight guides how a room is composed and how it changes through the day.",
  ],
  [
    "Proportion",
    "Structure, furniture and the spaces between them are calibrated to everyday life.",
  ],
];
const capabilities = [
  [
    "Architecture",
    "From feasibility and planning through construction: durable buildings with a strong sense of place.",
  ],
  [
    "Interior design",
    "Light, proportion, material and furniture, calibrated to the way you live or work.",
  ],
  [
    "Spatial strategy",
    "An organisation’s character and needs translated into a concrete, usable experience.",
  ],
];

export function MaterialInterlude() {
  return (
    <section className="material-interlude" aria-labelledby="material-heading">
      <h2 id="material-heading" className="reveal-line">
        The quiet logic
        <br />
        of <em>a place.</em>
      </h2>
      <figure className="detail-image detail-image--one image-reveal">
        <TransitionLink to="/work/courtyard-house">
          <img
            src={asset("court-2.jpg")}
            alt="Another view of Courtyard House"
            loading="lazy"
          />
        </TransitionLink>
      </figure>
      <figure className="detail-image detail-image--two image-reveal">
        <TransitionLink to="/work/house-on-the-ridge">
          <img
            src={asset("ridge-2.jpg")}
            alt="Interior geometry of House on the Ridge"
            loading="lazy"
          />
        </TransitionLink>
      </figure>
      <figure className="detail-image detail-image--three image-reveal">
        <TransitionLink to="/work/common-ground">
          <img
            src={asset("common-2.jpg")}
            alt="Daylight and shared spaces at Common Ground"
            loading="lazy"
          />
        </TransitionLink>
      </figure>
    </section>
  );
}

export function Practice() {
  return (
    <section className="practice-chapter" aria-labelledby="practice-heading">
      <span className="section-label">Practice</span>
      <h2 id="practice-heading" className="reveal-line">
        A practice of
        <br />
        <em>close attention.</em>
      </h2>
      <div className="principle-rows">
        {principles.map(([title, copy], i) => (
          <div className="principle-row" key={title}>
            <span className="row-index">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section
      className="capabilities-chapter"
      aria-labelledby="capabilities-heading"
    >
      <span className="section-label">Services</span>
      <h2 id="capabilities-heading">
        From a room
        <br />
        to a building.
      </h2>
      <div className="capability-rows">
        {capabilities.map(([title, copy], i) => (
          <Link to="/services" className="capability-row" key={title}>
            <span className="row-index">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
            <span className="row-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Archive() {
  return (
    <section className="archive-chapter" aria-labelledby="archive-heading">
      <span className="section-label">Archive</span>
      <h2 id="archive-heading" className="reveal-line">
        An index
        <br />
        of places.
      </h2>
      <div className="archive-rows">
        {projects.map((project, i) => (
          <TransitionLink
            to={`/work/${project.slug}`}
            className="archive-row"
            key={project.slug}
          >
            <span className="row-index">0{i + 1}</span>
            <h3>{project.title}</h3>
            <span className="archive-sector">{project.sector}</span>
            <span className="archive-year">{project.year}</span>
            <span aria-hidden="true">↗</span>
            <div className="archive-peek" aria-hidden="true">
              <img src={asset(project.cover)} alt="" loading="lazy" />
            </div>
          </TransitionLink>
        ))}
      </div>
      <Link className="folio-link" to="/work">
        View all projects <span>→</span>
      </Link>
    </section>
  );
}

export function StudioPreview() {
  return (
    <section
      className="studio-chapter"
      aria-labelledby="studio-preview-heading"
    >
      <span className="section-label">Studio</span>
      <div className="studio-fragment image-reveal">
        <img
          src={asset("studio.jpg")}
          alt="A view into the Forma studio"
          loading="lazy"
        />
      </div>
      <h2 id="studio-preview-heading" className="reveal-line">
        Architecture.
        <br />
        Interiors.
        <br />
        <em>Everyday life.</em>
      </h2>
      <div className="studio-preview-copy">
        <p>
          A multidisciplinary practice working across architecture, interiors
          and environments for work, gathering and retreat.
        </p>
        <Link className="folio-link" to="/studio">
          About the studio <span>↗</span>
        </Link>
      </div>
    </section>
  );
}

export function ContactConclusion() {
  return (
    <section
      className="contact-conclusion"
      aria-labelledby="contact-conclusion-heading"
    >
      <span className="section-label">Contact</span>
      <h2 id="contact-conclusion-heading" className="reveal-line">
        A thoughtful place
        <br />
        begins with
        <br />
        <em>a thought.</em>
      </h2>
      <div className="contact-conclusion-details">
        <div>
          <span className="section-label">Write</span>
          <a href="mailto:hello@forma.studio">hello@forma.studio</a>
        </div>
        <div>
          <span className="section-label">Visit</span>
          <p>
            Mumbai, India
            <br />
            By appointment
          </p>
        </div>
        <Link className="contact-invitation" to="/contact">
          Get in touch <span>↗</span>
        </Link>
      </div>
    </section>
  );
}

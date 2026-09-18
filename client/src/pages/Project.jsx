import ArchitectureImage from "../components/ArchitectureImage";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Page } from "../components/Layout";
import { EditorialTitle, useEditorialMotion } from "../components/Editorial";
import TransitionLink from "../components/TransitionLink";
import NotFound from "./NotFound";
import { asset, projects } from "../data/content";

// Presentation only: no additional project facts are introduced.
const titleLines = {
  "house-on-the-ridge": ["House on", "the Ridge"],
  "common-ground": ["Common", "Ground"],
  "courtyard-house": ["Courtyard", "House"],
  "north-light-gallery": ["North Light", "Gallery"],
  "the-long-table": ["The Long", "Table"],
  "monsoon-house": ["Monsoon", "House"],
};

export default function Project() {
  const { slug } = useParams();
  const project = projects.find(record => record.slug === slug);
  const ref = useEditorialMotion(slug);
  useEffect(() => { if (project) document.title = `${project.title} — Forma`; }, [project]);
  if (!project) return <NotFound />;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const nextNumber = String((index + 1) % projects.length + 1).padStart(2, "0");
  const secondary = project.gallery.find(image => image !== project.cover);

  return <Page footerLead={false}><div ref={ref} className={`monograph monograph--${slug}`}>
    <section className="monograph-opening">
      <EditorialTitle lines={titleLines[slug] || [project.title]} />
      <dl className="monograph-facts"><div><dt>Typology</dt><dd>{project.sector}</dd></div><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Scope</dt><dd>{project.scope}</dd></div></dl>
    </section>
    <figure className="monograph-hero editorial-media"><ArchitectureImage src={asset(project.cover)} alt={`${project.title} — ${project.location}`} loading="eager" fetchPriority="high" /></figure>
    <section className="monograph-narrative"><h2 className="editorial-reveal">{project.premise}</h2></section>
    <section className="monograph-spread" aria-label={`${project.title} photographic study`}>
      {secondary && <figure className="monograph-detail editorial-media"><ArchitectureImage src={asset(secondary)} alt={`Second photographic view of ${project.title}`} loading="lazy" /></figure>}
      <p className="monograph-spread-statement editorial-reveal">{project.accent}</p>
    </section>
    <section className="monograph-next" aria-labelledby="next-project-heading"><div className="next-project-index"><span className="section-label">Next project</span><span>{nextNumber}</span><Link className="folio-link" to="/work">All projects <span>→</span></Link><Link className="folio-link" to="/studio">About the studio <span>↗</span></Link></div><TransitionLink className="next-project-composition" to={`/work/${next.slug}`}><h2 id="next-project-heading">{next.title}<span aria-hidden="true">↗</span></h2><div className="next-project-media"><ArchitectureImage src={asset(next.cover)} alt={next.title} loading="lazy" /></div><span className="section-label">{next.sector} / {next.year}</span></TransitionLink></section>
  </div></Page>;
}

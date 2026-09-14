import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Page } from "../components/Layout";
import { asset, projects } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

function ProjectMeta({ project, number }) {
  return <div className="folio-meta"><span>{number} / {project.sector}</span><span>{project.location}</span><span>{project.year}</span></div>;
}

function ProjectSpread({ project, index }) {
  const number = String(index + 1).padStart(2, "0");
  return <article className={`folio-project folio-project--${number}`}>
    <ProjectMeta project={project} number={number} />
    <h3 className="folio-title reveal-line">{project.title}</h3>
    <Link className="folio-media image-reveal" to={`/work/${project.slug}`} aria-label={`View ${project.title}`}>
      <img src={asset(project.cover)} alt={`${project.title}, ${project.location}`} loading={index ? "lazy" : "eager"} />
    </Link>
    {index === 1 && <div className="folio-secondary image-reveal" aria-hidden="true"><img src={asset(project.gallery[1])} alt="" loading="lazy" /></div>}
    <p className="folio-premise">{project.premise}</p>
    <Link className="folio-link" to={`/work/${project.slug}`}>View project <span>↗</span></Link>
  </article>;
}

export default function Home() {
  const scope = useRef(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-word > span", { yPercent: 110, duration: 1.15, stagger: 0.1 })
        .from(".forma-hero-media", { y: 30, duration: 1 }, 0.2)
        .from(".hero-detail, .hero-index, .hero-scroll", { y: 12, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.65);
      gsap.to(".hero-word--arch", { yPercent: -14, ease: "none", scrollTrigger: { trigger: ".forma-hero", start: "top top", end: "bottom top", scrub: 0.7 } });
      gsap.to(".forma-hero-media img", { scale: 1.08, ease: "none", scrollTrigger: { trigger: ".forma-hero", start: "top top", end: "bottom top", scrub: 0.7 } });
      gsap.utils.toArray(".reveal-line").forEach((line) => gsap.from(line, { y: 55, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: line, start: "top 88%" } }));
      gsap.utils.toArray(".image-reveal img").forEach((image) => gsap.from(image, { scale: 1.04, duration: 1, ease: "power3.out", scrollTrigger: { trigger: image, start: "top 88%", once: true } }));
      gsap.from(".works-rule", { scaleX: 0, transformOrigin: "left", duration: 1.1, scrollTrigger: { trigger: ".works-intro", start: "top 80%" } });
    }, scope);
    return () => context.revert();
  }, []);
  return <Page><div ref={scope} className="forma-home">
    <section className="forma-hero" aria-labelledby="hero-title">
      <div className="hero-index">01 / 05<br />Mumbai, India</div>
      <h1 id="hero-title" className="hero-monument"><span className="hero-word"><span>FORMA</span></span><span className="hero-word hero-word--arch"><span>ARCHI—</span></span><span className="hero-word hero-word--tecture"><span>TECTURE</span></span></h1>
      <div className="forma-hero-media"><img src={asset("ridge.jpg")} alt="House on the Ridge in Alibaug" /></div>
      <p className="hero-detail">Spaces shaped around people,<br />material and light.</p>
      <span className="hero-caption-new">House on the Ridge / 2025</span>
      <a className="hero-scroll" href="#studio-intro">Scroll ↓</a>
    </section>
    <section id="studio-intro" className="manifesto">
      <div className="section-label">02 — Studio</div>
      <h2 className="reveal-line">We shape spaces around<br />material, context and<br /><em>human experience.</em></h2>
      <div className="manifesto-aside"><p>Homes for living.<br />Places for gathering.<br />Spaces that endure.</p><Link className="folio-link" to="/studio">Inside the studio <span>↗</span></Link></div>
    </section>
    <section className="works-intro"><div className="section-label">03 — Selected works</div><div className="works-rule" /><h2 className="reveal-line">SELECTED<br />WORKS</h2><span className="works-years">2024—2025</span><span className="works-count">03 PROJECTS</span></section>
    <section className="folio-list" aria-label="Featured projects">{projects.slice(0, 3).map((project, index) => <ProjectSpread key={project.slug} project={project} index={index} />)}</section>
  </div></Page>;
}

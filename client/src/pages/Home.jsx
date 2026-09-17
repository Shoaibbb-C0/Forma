import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Page } from "../components/Layout";
import { asset, projects } from "../data/content";
import TransitionLink from "../components/TransitionLink";
import {
  MaterialInterlude,
  Practice,
  Capabilities,
  Archive,
  StudioPreview,
  ContactConclusion,
} from "../components/HomeChapters";

gsap.registerPlugin(ScrollTrigger);

function ProjectMeta({ project, number }) {
  return (
    <div className="folio-meta">
      <span>
        {number} / {project.sector}
      </span>
      <span>{project.location}</span>
      <span>{project.year}</span>
    </div>
  );
}

function ProjectSpread({ project, index }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article className={`folio-project folio-project--${number}`}>
      <ProjectMeta project={project} number={number} />
      <h3 className="folio-title reveal-line">
        <TransitionLink to={`/work/${project.slug}`}>
          {project.title}
        </TransitionLink>
      </h3>
      <TransitionLink
        className="folio-media image-reveal"
        to={`/work/${project.slug}`}
        aria-label={`View ${project.title}`}
      >
        <img
          src={asset(project.cover)}
          alt={`${project.title}, ${project.location}`}
          loading={index ? "lazy" : "eager"}
        />
      </TransitionLink>
      {(index === 1 || index === 3) && (
        <div className="folio-secondary image-reveal" aria-hidden="true">
          <img src={asset(project.gallery[1])} alt="" loading="lazy" />
        </div>
      )}
      <p className="folio-premise">{project.premise}</p>
      <TransitionLink className="folio-link" to={`/work/${project.slug}`}>
        View project <span>↗</span>
      </TransitionLink>
    </article>
  );
}

export default function Home() {
  const scope = useRef(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const context = gsap.context((self) => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-word > span", {
          yPercent: 110,
          duration: 1.15,
          stagger: 0.1,
        })
        .from(".forma-hero-media", { opacity: 0, duration: 1 }, 0.2)
        .from(
          ".hero-detail",
          { y: 12, opacity: 0, duration: 0.7, stagger: 0.08 },
          0.65,
        );
      gsap.to(".forma-hero-media img", {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".forma-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
      gsap.fromTo(
        ".folio-project--03",
        { backgroundColor: "#f0f0ec", color: "#0b0c0b" },
        {
          backgroundColor: "#111210",
          color: "#f0f0ec",
          ease: "none",
          scrollTrigger: {
            trigger: ".folio-project--03",
            start: "top 90%",
            end: "top 20%",
            scrub: true,
          },
        },
      );
      gsap.utils
        .toArray(".reveal-line")
        .forEach((line) =>
          ScrollTrigger.create({
            trigger: line,
            start: "top 88%",
            once: true,
            onEnter: () => self.add(() =>
              gsap.fromTo(
                line,
                { y: 55, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.9,
                  ease: "power3.out",
                  clearProps: "transform,opacity",
                },
              )),
          }),
        );
      gsap.utils
        .toArray(".image-reveal img")
        .forEach((image) =>
          gsap.from(image, {
            scale: 1.04,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: image, start: "top 88%", once: true },
          }),
        );
      gsap.from(".works-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.1,
        scrollTrigger: { trigger: ".works-intro", start: "top 80%" },
      });
      gsap.utils
        .toArray(".type-mask-group")
        .forEach((group) =>
          ScrollTrigger.create({
            trigger: group,
            start: "top 86%",
            once: true,
            onEnter: () => self.add(() =>
              gsap.fromTo(
                group.querySelectorAll(".type-mask > span"),
                { yPercent: 110 },
                {
                  yPercent: 0,
                  stagger: 0.1,
                  duration: 1,
                  ease: "power4.out",
                  clearProps: "transform",
                },
              )),
          }),
        );
      gsap.utils
        .toArray(".image-reveal")
        .forEach((media, index) =>
          ScrollTrigger.create({
            trigger: media,
            start: index % 2 ? "top 92%" : "top 86%",
            once: true,
            onEnter: () => self.add(() =>
              gsap.fromTo(
                media,
                { clipPath: "inset(0 0 100% 0)" },
                {
                  clipPath: "inset(0)",
                  duration: 1.1,
                  ease: "power4.out",
                  clearProps: "clipPath",
                },
              )),
          }),
        );
      gsap.fromTo(
        ".material-interlude",
        { backgroundColor: "#111210", color: "#f0f0ec" },
        {
          backgroundColor: "#f0f0ec",
          color: "#0b0c0b",
          ease: "none",
          scrollTrigger: {
            trigger: ".practice-chapter",
            start: "top 95%",
            end: "top 35%",
            scrub: true,
          },
        },
      );
    }, scope);
    return () => context.revert();
  }, []);
  return (
    <Page footerLead={false}>
      <div ref={scope} className="forma-home">
        <section className="forma-hero" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero-monument">
            <span className="hero-word">
              <span>FORMA</span>
            </span>
            <span className="hero-word hero-word--arch">
              <span>ARCHI—</span>
            </span>
            <span className="hero-word hero-word--tecture">
              <span>TECTURE</span>
            </span>
          </h1>
          <div className="forma-hero-media">
            <img src={asset("ridge.jpg")} alt="House on the Ridge in Alibaug" fetchpriority="high" decoding="async" />
          </div>
          <p className="hero-detail">
            Spaces shaped around people,
            <br />
            material and light.
          </p>
        </section>
        <section id="studio-intro" className="manifesto">
          <h2 className="type-mask-group">
            <span className="type-mask">
              <span>We shape spaces around</span>
            </span>
            <span className="type-mask">
              <span>material, context and</span>
            </span>
            <span className="type-mask">
              <span>
                <em>human experience.</em>
              </span>
            </span>
          </h2>
          <div className="manifesto-aside">
            <Link className="folio-link" to="/studio">
              Inside the studio <span>↗</span>
            </Link>
          </div>
        </section>
        <section className="works-intro">
          <div className="works-rule" />
          <h2 className="reveal-line">
            SELECTED
            <br />
            WORKS
          </h2>
        </section>
        <section className="folio-list" aria-label="Featured projects">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectSpread key={project.slug} project={project} index={index} />
          ))}
        </section>
        <MaterialInterlude />
        <Practice />
        <Capabilities />
        <section
          className="folio-list more-work"
          aria-label="More selected projects"
        >
          {projects.slice(3, 5).map((project, index) => (
            <ProjectSpread
              key={project.slug}
              project={project}
              index={index + 3}
            />
          ))}
        </section>
        <Archive />
        <StudioPreview />
        <ContactConclusion />
      </div>
    </Page>
  );
}

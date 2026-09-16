import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "./TransitionLink";
import { asset, projects } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export function useEditorialMotion(key) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const preferences = gsap.matchMedia();
    preferences.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const title = gsap.utils.toArray(".editorial-title .type-mask > span");
        if (title.length) gsap.from(title, { yPercent: 110, stagger: .09, duration: 1, ease: "power4.out" });
        gsap.utils.toArray(".editorial-reveal").forEach(element => {
          ScrollTrigger.create({ trigger: element, start: "top 88%", once: true,
            onEnter: () => gsap.fromTo(element, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .85, ease: "power3.out", clearProps: "transform,opacity" }) });
        });
        gsap.utils.toArray(".editorial-media").forEach(element => {
          ScrollTrigger.create({ trigger: element, start: "top 90%", once: true,
            onEnter: () => gsap.fromTo(element, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0)", duration: 1.1, ease: "power4.out", clearProps: "clipPath" }) });
        });
      }, ref);
      return () => context.revert();
    });
    return () => preferences.revert();
  }, [key]);
  return ref;
}

export function EditorialTitle({ lines, className = "", ...props }) {
  return <h1 className={`editorial-title ${className}`} {...props}>{lines.map((line, index) => <span className="type-mask" key={index}><span>{line}</span></span>)}</h1>;
}

export function ProjectIndex({ records = projects }) {
  return <div className="catalogue-rows">{records.map(project => {
    const number = String(projects.indexOf(project) + 1).padStart(2, "0");
    return <TransitionLink className="catalogue-row" key={project.slug} to={`/work/${project.slug}`}>
      <span className="row-index">{number}</span><h2>{project.title}</h2><span className="catalogue-sector">{project.sector}</span><span className="catalogue-year">{project.year}</span><span className="catalogue-arrow" aria-hidden="true">↗</span>
      <div className="catalogue-preview" aria-hidden="true"><img src={asset(project.cover)} alt="" loading="lazy" /></div>
    </TransitionLink>;
  })}</div>;
}

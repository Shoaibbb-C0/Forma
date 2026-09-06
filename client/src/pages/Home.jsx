import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Page } from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import ContactCta from "../components/ContactCta";
import { asset, projects } from "../data/content";

export default function Home() {
  const ref = useRef();
  useEffect(() => {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.from(ref.current.querySelectorAll(".hero-reveal"), {
        y: 42,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".hero-image img", {
        scale: 1.08,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, []);
  return (
    <Page>
      <div ref={ref}>
        <section className="hero">
          <div className="hero-kicker hero-reveal">
            <span>Independent practice</span>
            <span>Mumbai / India</span>
            <span>Residential · Commercial</span>
          </div>
          <h1 className="hero-reveal">
            Spaces for
            <br />
            <i>living well.</i>
          </h1>
          <div className="hero-image hero-reveal">
            <img
              src={asset("ridge.jpg")}
              alt="Warm, material-focused interior by Forma"
            />
            <p className="hero-caption">
              <b>House on the Ridge</b>
              <span>Alibaug · 2025</span>
            </p>
          </div>
          <p className="hero-note hero-reveal">
            Architecture shaped by the rhythms of everyday life, the character
            of a site and the quiet power of natural materials.
          </p>
          <Link className="hero-arrow hero-reveal" to="/work">
            <span>Discover our work</span>↓
          </Link>
          <p className="scroll-note">
            Selected work below <i>↘</i>
          </p>
        </section>
        <section className="statement">
          <div>
            <p className="eyebrow">Our point of view</p>
            <p className="statement-side">
              Homes for living.
              <br />
              Places for gathering.
              <br />
              Spaces that endure.
            </p>
          </div>
          <div>
            <h2>
              We compose light, proportion and material into places that feel{" "}
              <em>entirely their own.</em>
            </h2>
            <p className="statement-copy">
              Forma is an architecture and design practice for residential and
              commercial spaces. We listen closely, draw precisely and build
              with care—creating environments that become richer through use.
            </p>
            <Link className="text-link" to="/studio">
              Inside the studio <span>→</span>
            </Link>
          </div>
        </section>
        <section className="selected">
          <div className="section-head">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>
                Different sites.
                <br />
                <em>Distinct lives.</em>
              </h2>
            </div>
            <p>
              Six studies in landscape, ritual, light and matter. Each begins
              with a different question and finds its own form.
            </p>
            <Link className="text-link" to="/work">
              View all six <span>→</span>
            </Link>
          </div>
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </section>
        <section className="method-strip">
          <p>Our work moves between</p>
          <div>
            <b>Context</b>
            <span>↔</span>
            <b>Material</b>
            <span>↔</span>
            <b>Ritual</b>
          </div>
          <small>Three lenses. One coherent place.</small>
        </section>
        <section className="services-band">
          <div className="services-heading">
            <p className="eyebrow">What we do</p>
            <p>
              From the scale of a room
              <br />
              to the shape of a building.
            </p>
          </div>
          <h2>
            <Link to="/services">
              Architecture <span>↗</span>
            </Link>
            <Link to="/services">
              Interior design <span>↗</span>
            </Link>
            <Link to="/services">
              Spatial strategy <span>↗</span>
            </Link>
          </h2>
          <Link className="text-link light" to="/services">
            See our complete approach <span>→</span>
          </Link>
        </section>
        <ContactCta />
      </div>
    </Page>
  );
}

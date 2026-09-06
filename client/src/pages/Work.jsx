import React, { useState } from "react";
import { Page, Intro } from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/content";
export default function Work() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.sector === filter);
  return (
    <Page>
      <Intro
        eyebrow="Selected work"
        title={
          <>
            Built around
            <br />
            <em>real life.</em>
          </>
        }
        copy="Each project begins by looking carefully: at a site, a brief, and the rituals that give it meaning."
      />
      <div className="filters" aria-label="Filter projects">
        {["All", "Residential", "Commercial"].map((value) => (
          <button
            className={filter === value ? "active" : ""}
            onClick={() => setFilter(value)}
            key={value}
          >
            {value}
          </button>
        ))}
      </div>
      <section className="archive">
        {visible.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i % 3} />
        ))}
      </section>
    </Page>
  );
}

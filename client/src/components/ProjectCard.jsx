import ArchitectureImage from "./ArchitectureImage";
import React from "react";
import TransitionLink from "./TransitionLink";
import { asset } from "../data/content";
export default function ProjectCard({ project, index = 0 }) {
  return (
    <article className={`project-card p${index}`}>
      <TransitionLink to={`/work/${project.slug}`}>
        <div className="image-wrap">
          <ArchitectureImage
            src={asset(project.cover)}
            alt={`${project.title} project`}
            loading="lazy"
          />
        </div>
        <div className="card-meta">
          <span>{project.sector}</span>
          <h2>{project.title}</h2>
          <span>
            {project.location} · {project.year}
          </span>
        </div>
      </TransitionLink>
    </article>
  );
}

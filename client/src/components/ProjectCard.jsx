import React from "react";
import { Link } from "react-router-dom";
import { asset } from "../data/content";
export default function ProjectCard({ project, index = 0 }) {
  return (
    <article className={`project-card p${index}`}>
      <Link to={`/work/${project.slug}`}>
        <div className="image-wrap">
          <img
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
      </Link>
    </article>
  );
}

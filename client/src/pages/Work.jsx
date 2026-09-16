import React, { useState } from "react";
import { Page } from "../components/Layout";
import { EditorialTitle, ProjectIndex, useEditorialMotion } from "../components/Editorial";
import { projects } from "../data/content";

export default function Work() {
  const [filter, setFilter] = useState("All");
  const ref = useEditorialMotion("archive");
  const categories = ["All", ...new Set(projects.map(project => project.sector))];
  const visible = filter === "All" ? projects : projects.filter(project => project.sector === filter);
  const years = projects.map(project => Number(project.year));
  return <Page footerLead={false}><div ref={ref} className="catalogue-page">
    <section className="catalogue-opening">
      <EditorialTitle lines={["PROJECTS"]} />
      <p className="catalogue-years">{Math.min(...years)}—{Math.max(...years)}</p>
    </section>
    <section className="catalogue-content" aria-label="Project catalogue">
      <div className="catalogue-controls"><div role="group" aria-label="Filter projects">{categories.map(value => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div><span className="section-label" role="status">{String(visible.length).padStart(2,"0")} / {String(projects.length).padStart(2,"0")} projects</span></div>
      <ProjectIndex records={visible} />
    </section>
  </div></Page>;
}

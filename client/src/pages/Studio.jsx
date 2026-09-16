import React from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/Layout";
import { EditorialTitle, useEditorialMotion } from "../components/Editorial";
import { Practice, Capabilities } from "../components/HomeChapters";
import { asset } from "../data/content";

export default function Studio() {
  const ref = useEditorialMotion("studio");
  return <Page footerLead={false}><div ref={ref} className="studio-manifesto-page">
    <section className="studio-manifesto-opening"><span className="section-label">02 / Studio</span><EditorialTitle lines={["FORMA"]} /><h2 className="studio-opening-statement editorial-reveal">A practice of<br /><em>close attention.</em></h2><p className="studio-opening-note">Architecture / Interiors<br />Mumbai, India</p></section>
    <figure className="studio-manifesto-image editorial-media"><img src={asset("studio.jpg")} alt="A view into the Forma studio" /></figure>
    <section className="studio-story"><span className="section-label">01 / Point of view</span><h2 className="editorial-reveal">The spaces around us influence how fully we can <em>inhabit a day.</em></h2><p>We are a multidisciplinary practice working across architecture, interiors and environments for work, gathering and retreat.</p><p>Our work begins with patient observation. We look for the quiet logic of a site, then make it tangible through structure, light and material.</p></section>
    <Practice /><Capabilities />
    <section className="studio-conclusion"><h2>Start a<br /><em>conversation.</em></h2><Link className="folio-link" to="/contact">Contact <span>↗</span></Link><Link className="folio-link" to="/work">Explore the projects <span>→</span></Link></section>
  </div></Page>;
}

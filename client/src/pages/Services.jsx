import React from "react";
import { Page, Intro } from "../components/Layout";
import ContactCta from "../components/ContactCta";
const services = [
  [
    "Architecture",
    "From feasibility and planning through construction, we design durable buildings with a strong sense of place.",
  ],
  [
    "Interior design",
    "We shape interiors through light, proportion, material and furniture—closely calibrated to the way you live or work.",
  ],
  [
    "Spatial strategy",
    "For commercial spaces, we turn an organisation’s character and needs into a concrete, usable experience.",
  ],
];
export default function Services() {
  return (
    <Page footerLead={false}>
      <Intro
        eyebrow="How we work"
        title={
          <>
            A clear way
            <br />
            to make <em>space.</em>
          </>
        }
      />
      <section className="service-list">
        {services.map(([title, copy]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <ContactCta />
    </Page>
  );
}

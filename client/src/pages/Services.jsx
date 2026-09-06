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
    <Page>
      <Intro
        eyebrow="How we work"
        title={
          <>
            A clear way
            <br />
            to make <em>space.</em>
          </>
        }
        copy="From first possibility to final detail, we bring a focused, collaborative approach."
      />
      <section className="service-list">
        {services.map(([title, copy]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{copy}</p>
            <small>
              Strategy · Concept · Design development · Site support
            </small>
          </article>
        ))}
      </section>
      <ContactCta />
    </Page>
  );
}

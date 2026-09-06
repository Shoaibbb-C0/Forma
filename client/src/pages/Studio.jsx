import React from "react";
import { Page, Intro } from "../components/Layout";
import { asset } from "../data/content";
export default function Studio() {
  return (
    <Page>
      <Intro
        eyebrow="The studio"
        title={
          <>
            A practice of
            <br />
            <em>close attention.</em>
          </>
        }
        copy="Forma was founded on the belief that the spaces around us influence how fully we can inhabit a day."
      />
      <section className="studio-image">
        <img
          src={asset("studio.jpg")}
          alt="Architectural model and materials in the Forma studio"
        />
      </section>
      <section className="studio-copy">
        <p>
          We are a small, multidisciplinary practice working across
          architecture, interiors and environments for work, gathering and
          retreat.
        </p>
        <p>
          Our work begins with patient observation. We look for the quiet logic
          of a site, then make it tangible through structure, light and
          material.
        </p>
      </section>
      <section className="numbers">
        <div>
          <b>14</b>
          <span>years of practice</span>
        </div>
        <div>
          <b>48</b>
          <span>spaces completed</span>
        </div>
        <div>
          <b>7</b>
          <span>countries reached</span>
        </div>
      </section>
    </Page>
  );
}

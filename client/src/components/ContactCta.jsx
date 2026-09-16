import React from "react";
import { Link } from "react-router-dom";
export default function ContactCta() {
  return (
    <section className="contact-cta">
      <h2>
        Bring us
        <br />
        your <em>idea.</em>
      </h2>
      <Link className="button" to="/contact">
        Start a conversation <span>↗</span>
      </Link>
    </section>
  );
}

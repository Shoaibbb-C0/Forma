import React from "react";
import { Link } from "react-router-dom";
export function Footer({ showLead = true }) {
  return (
    <footer>
      {showLead && (
        <div className="footer-lead">
          <p>
            A thoughtful place
            <br />
            begins with <em>a thought.</em>
          </p>
          <Link
            className="footer-arrow"
            to="/contact"
            aria-label="Contact Forma"
          >
            ↗
          </Link>
        </div>
      )}
      <div className="footer-grid">
        <Link className="logo" to="/">
          Forma<sup>®</sup>
        </Link>
        <div>
          <small>Visit</small>
          <p>
            Mumbai, India
            <br />
            By appointment
          </p>
        </div>
        <div>
          <small>Write</small>
          <a href="mailto:hello@forma.studio">hello@forma.studio</a>
        </div>
        <div>
          <small>Explore</small>
          <Link to="/work">Projects</Link>
          <Link to="/journal">Journal</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Forma Studio</span>
        <Link to="/contact">Available for select projects ↗</Link>
      </div>
    </footer>
  );
}
export function Page({ children, footerLead = true }) {
  return (
    <>
      <main>{children}</main>
      <Footer showLead={footerLead} />
    </>
  );
}
export function Intro({ eyebrow, title, copy }) {
  return (
    <section className="intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {copy && <p className="lede">{copy}</p>}
    </section>
  );
}

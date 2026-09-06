import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header>
      <Link className="logo" to="/" aria-label="Forma home">
        Forma<sup>®</sup>
      </Link>
      <p className="nav-specialty">
        Architecture
        <br />& design practice
      </p>
      <button
        className="menu"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="nav"
      >
        {open ? "Close ×" : "Menu +"}
      </button>
      <nav id="nav" className={open ? "open" : ""}>
        <NavLink to="/work">Work</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/studio">Studio</NavLink>
        <NavLink to="/journal">Journal</NavLink>
        <NavLink className="nav-contact" to="/contact">
          Start a project ↗
        </NavLink>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-lead">
        <p>
          A thoughtful place
          <br />
          begins with <em>a thought.</em>
        </p>
        <Link className="footer-arrow" to="/contact">
          ↗
        </Link>
      </div>
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
          <small>Follow</small>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Architecture & design practice</span>
        <span>© 2026 Forma Studio</span>
        <Link to="/contact">Available for select projects ↗</Link>
      </div>
    </footer>
  );
}
export function Page({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
export function Intro({ eyebrow, title, copy }) {
  return (
    <section className="intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {copy && <p className="lede">{copy}</p>}
    </section>
  );
}

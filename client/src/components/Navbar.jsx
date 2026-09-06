import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header>
      <Link className="logo" to="/" aria-label="Forma home">
        Forma<sup>®</sup>
      </Link>

      <button
        className="menu"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="primary-navigation"
      >
        {open ? "Close ×" : "Menu +"}
      </button>

      <nav id="primary-navigation" className={open ? "open" : ""}>
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

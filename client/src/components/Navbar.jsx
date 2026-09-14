import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [["Projects", "/work"], ["Studio", "/studio"], ["Contact", "/contact"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);
  return <header className={`site-header${open ? " is-open" : ""}`}>
    <Link className="header-brand" to="/" aria-label="Forma home">FORMA</Link>
    <p className="header-practice">Architecture /<br />Spatial Practice</p>
    <button className="menu" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation">{open ? "Close" : "Menu"}</button>
    <nav id="primary-navigation" className={open ? "open" : ""} aria-label="Primary navigation">
      {links.map(([label, to], index) => <NavLink key={to} to={to}><span>{String(index + 1).padStart(2, "0")}</span>{label}</NavLink>)}
      <div className="nav-metadata">Architecture / Design<br />Est. 2026</div>
    </nav>
  </header>;
}

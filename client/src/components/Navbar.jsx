import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  ["Projects", "/work"],
  ["Studio", "/studio"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);
  useEffect(() => {
    if (!open) return undefined;
    const content = [...document.querySelectorAll("main, footer")];
    content.forEach((element) => {
      element.inert = true;
    });
    const menuButton = headerRef.current.querySelector("button");
    function keyboard(event) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.focus();
      }
      if (event.key !== "Tab") return;
      const items = [...headerRef.current.querySelectorAll("a, button")].filter(
        (element) => element.offsetParent !== null,
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    function resize() {
      if (innerWidth > 650) setOpen(false);
    }
    document.addEventListener("keydown", keyboard);
    window.addEventListener("resize", resize);
    return () => {
      content.forEach((element) => {
        element.inert = false;
      });
      document.removeEventListener("keydown", keyboard);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header ref={headerRef} className={`site-header${open ? " is-open" : ""}`}>
      <Link className="header-brand" to="/" aria-label="Forma home">
        FORMA
      </Link>
      <button
        className="menu"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="primary-navigation"
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="primary-navigation"
        className={open ? "open" : ""}
        aria-label="Primary navigation"
      >
        {links.map(([label, to], index) => (
          <NavLink key={to} to={to}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </NavLink>
        ))}
        <div className="nav-metadata">
          Architecture / Design
          <br />
          Est. 2026
        </div>
      </nav>
      <Link className="header-status" to="/contact">
        <i aria-hidden="true" />
        Accepting select projects <span>↗</span>
      </Link>
    </header>
  );
}

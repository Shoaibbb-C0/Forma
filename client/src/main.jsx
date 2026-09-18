import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { routeMetadata, routeStructuredData } from "./data/metadata";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Project from "./pages/Project";
import Services from "./pages/Services";
import Studio from "./pages/Studio";
import Journal from "./pages/Journal";
import Article from "./pages/Article";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import "./styles.css";
import "./phase3.css";
import "./refinements.css";

function RouteEffects() {
  const { pathname, key } = useLocation();
  const navigation = useNavigationType();
  useLayoutEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const position = navigation === "POP" ? positions.get(key) || 0 : 0;
    const restore = () => window.scrollTo({ top: position, behavior: "instant" });
    restore();
    const frame = requestAnimationFrame(restore);
    const main = document.querySelector("main");
    if (navigation !== "POP") main?.focus({ preventScroll: true });
    return () => {
      cancelAnimationFrame(frame);
      positions.set(key, window.scrollY);
      history.scrollRestoration = previous;
    };
  }, [key, navigation]);
  useEffect(() => {
    const meta = routeMetadata(pathname);
    document.title = meta.title;
    function tag(name, content, property = false) {
      const attr = property ? "property" : "name";
      let element = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attr, name); document.head.append(element); }
      element.content = content;
    }
    tag("description", meta.description);
    tag("robots", meta.robots);
    const origin = new URL(import.meta.env.VITE_SITE_URL || "https://forma-beta-two.vercel.app").origin;
    const path = pathname.replace(/\/+$/, "") || "/";
    for (const [name, value] of Object.entries({ title: meta.title, description: meta.description, image: new URL(meta.image, origin).href, url: new URL(path, origin).href, type: meta.type, site_name: "FORMA" })) tag(`og:${name}`, value, true);
    tag("twitter:card", "summary_large_image");
    tag("twitter:title", meta.title);
    tag("twitter:description", meta.description);
    tag("twitter:image", new URL(meta.image, origin).href);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = new URL(path, origin).href;
    let schema = document.getElementById("route-schema");
    const structured = routeStructuredData(path, origin);
    if (structured) {
      if (!schema) { schema = document.createElement("script"); schema.id = "route-schema"; schema.type = "application/ld+json"; document.head.append(schema); }
      schema.textContent = JSON.stringify(structured);
    } else schema?.remove();
  }, [pathname]);
  return null;
}
const positions = new Map();
function App() {
  return (
    <>
      <RouteEffects />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="/services" element={<Services />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { routeMetadata } from "./data/metadata";
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
    window.scrollTo({ top: position, behavior: "instant" });
    const main = document.querySelector("main");
    if (navigation !== "POP") main?.focus({ preventScroll: true });
    return () => {
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
    for (const [name, value] of Object.entries({ title: meta.title, description: meta.description, image: new URL(meta.image, location.origin).href, url: location.href, type: meta.type, site_name: "FORMA" })) tag(`og:${name}`, value, true);
    tag("twitter:card", "summary_large_image");
    tag("twitter:title", meta.title);
    tag("twitter:description", meta.description);
    tag("twitter:image", new URL(meta.image, location.origin).href);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = new URL(pathname, location.origin).href;
  }, [pathname]);
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = main.animate(
      [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
    );
    return () => animation.cancel();
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
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </BrowserRouter>,
);

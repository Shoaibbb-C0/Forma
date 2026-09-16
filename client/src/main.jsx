import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
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

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const section = pathname.split("/").filter(Boolean)[0];
    const labels = {
      work: "Work",
      services: "Services",
      studio: "Studio",
      journal: "Journal",
      contact: "Contact",
    };
    document.title = section
      ? `${labels[section] || "Page"} — Forma`
      : "Forma — Architecture & Design";
  }, [pathname]);
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    main.animate(
      [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" },
    );
  }, [pathname]);
  return null;
}
function App() {
  return (
    <>
      <RouteEffects />
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

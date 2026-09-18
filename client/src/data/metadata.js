import { projects, articles, asset } from "./content.js";
const descriptions = {
  "/": "FORMA is a Mumbai architecture and interiors practice working with material, context and light.",
  "/work": "Explore FORMA's residential and commercial architecture projects, 2022–2025.",
  "/studio": "Meet FORMA's approach to architecture, interiors and spatial strategy.",
  "/services": "Architecture, interior design and spatial strategy by FORMA.",
  "/journal": "Notes on space, material and everyday life from FORMA.",
  "/contact": "Contact FORMA in Mumbai to discuss your architecture or interior design project.",
};
export function routeStructuredData(path, origin) {
  path = path.replace(/\/+$/, "") || "/";
  const meta = routeMetadata(path);
  if (meta.robots.startsWith("noindex")) return null;
  const record = projects.find(p => path === `/work/${p.slug}`) || articles.find(a => path === `/journal/${a.slug}`);
  const url = new URL(path, origin).href;
  return { "@context": "https://schema.org", "@type": "WebPage", name: meta.title, description: meta.description, url, ...(record ? { mainEntity: { "@type": path.startsWith("/work/") ? "CreativeWork" : "Article", name: record.title, description: meta.description, image: new URL(meta.image, origin).href, url } } : {}) };
}
export function routeMetadata(path) {
  path = path.replace(/\/+$/, "") || "/";
  const project = projects.find(p => path === `/work/${p.slug}`);
  const article = articles.find(a => path === `/journal/${a.slug}`);
  const record = project || article;
  const valid = !!record || Object.hasOwn(descriptions, path);
  return {
    title: record ? `${record.title} — Forma` : path === "/" ? "Forma — Architecture & Design" : valid ? `${path.slice(1)[0].toUpperCase()}${path.slice(2)} — Forma` : "Page not found — Forma",
    description: project ? `${project.title}: ${project.sector.toLowerCase()} architecture in ${project.location}, ${project.year}. ${project.premise}` : article?.excerpt || descriptions[path] || "This page could not be found. Explore FORMA's project archive.",
    image: asset(record?.cover || "ridge.jpg"),
    robots: valid ? "index,follow" : "noindex,follow",
    type: article ? "article" : "website",
  };
}

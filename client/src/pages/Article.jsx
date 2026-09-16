import React from "react";
import { useParams } from "react-router-dom";
import { Page } from "../components/Layout";
import NotFound from "./NotFound";
import { articles, asset } from "../data/content";
export default function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return (
    <Page footerLead={false}>
      <article className="article">
        <p className="eyebrow">{article.date}</p>
        <h1>{article.title}</h1>
        <p className="lede">{article.excerpt}</p>
        <img src={asset(article.cover)} alt="" />
      </article>
    </Page>
  );
}

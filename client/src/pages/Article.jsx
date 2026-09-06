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
    <Page>
      <article className="article">
        <p className="eyebrow">Field notes · {article.date} · By Forma</p>
        <h1>{article.title}</h1>
        <p className="lede">{article.excerpt}</p>
        <img src={asset(article.cover)} alt="" />
        <div className="article-body">
          <p>
            A room does not need to announce itself to feel significant. The
            spaces we remember have often given us something more useful: an
            easy place to land, a material that takes the sun well, a threshold
            that holds a conversation a little longer.
          </p>
          <p>
            We think of design as a framework for ordinary life. It needs enough
            order to be dependable, and enough generosity to make room for
            change. That balance is built through repeated acts of attention.
          </p>
          <h2>The shape of a day</h2>
          <p>
            When a building is designed from its daily rituals outward, its
            character becomes durable. Light enters where it is needed. Storage
            settles into the background. A view is framed at the right height.
          </p>
        </div>
      </article>
    </Page>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Page, Intro } from "../components/Layout";
import { articles, asset } from "../data/content";
export default function Journal() {
  return (
    <Page>
      <Intro
        eyebrow="Journal / Notes from the studio"
        title={
          <>
            On space, matter
            <br />
            &amp; <em>living.</em>
          </>
        }
      />
      <section className="journal-list">
        {articles.map((article) => (
          <article key={article.slug}>
            <Link to={`/journal/${article.slug}`}>
              <img src={asset(article.cover)} alt="" loading="lazy" />
              <p className="eyebrow">Field notes · {article.date}</p>
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
              <span className="text-link">Read note →</span>
            </Link>
          </article>
        ))}
      </section>
    </Page>
  );
}

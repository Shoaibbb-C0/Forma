import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main>
      <section className="notfound">
        <p className="eyebrow">404</p>
        <h1>
          That room
          <br />
          isn’t here.
        </h1>
        <Link className="button" to="/">
          Return home <span>→</span>
        </Link>
      </section>
    </main>
  );
}

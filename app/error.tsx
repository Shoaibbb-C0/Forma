'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="wrap page-head">
      <h1>A brief interruption.</h1>
      <p>
        We couldn’t load this page. Your saved content is safe. Please try
        again.
      </p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}

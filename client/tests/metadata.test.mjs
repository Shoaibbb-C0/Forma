import { test } from "node:test";
import assert from "node:assert/strict";
import { routeMetadata } from "../src/data/metadata.js";
import { projects, articles } from "../src/data/content.js";
test("projects and notes have specific titles, descriptions and images", () => {
  for (const [section, records] of [["work", projects], ["journal", articles]]) {
    for (const record of records) {
      const meta = routeMetadata(`/${section}/${record.slug}`);
      assert.equal(meta.title, `${record.title} — Forma`);
      assert.ok(meta.description.length > 15);
      assert.equal(meta.image, `/assets/${record.cover}`);
      assert.equal(meta.robots, "index,follow");
    }
  }
});
test("missing routes and slugs are not indexed", () => {
  for (const path of ["/missing", "/work/no-project", "/journal/no-note"]) {
    assert.equal(routeMetadata(path).robots, "noindex,follow");
    assert.equal(routeMetadata(path).title, "Page not found — Forma");
  }
});

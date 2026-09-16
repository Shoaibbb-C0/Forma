import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { projects } from "../src/data/content.js";

test("catalogue slugs and actual facts are complete and unique", () => {
  assert.equal(projects.length, 6);
  assert.equal(new Set(projects.map(project => project.slug)).size, projects.length);
  for (const project of projects) {
    for (const field of ["slug", "title", "sector", "location", "year", "scope", "premise"]) {
      assert.ok(project[field], `${project.slug}: missing ${field}`);
    }
  }
});

test("each project has two distinct existing photographs and an existing cover", () => {
  for (const project of projects) {
    assert.equal(new Set(project.gallery).size, 2);
    assert.ok(project.gallery.includes(project.cover));
    for (const image of project.gallery) {
      assert.ok(existsSync(new URL(`../public/assets/${image}`, import.meta.url)), image);
    }
  }
});

test("category filters and archive range match the existing records", () => {
  assert.equal(projects.filter(project => project.sector === "Residential").length, 3);
  assert.equal(projects.filter(project => project.sector === "Commercial").length, 3);
  const years = projects.map(project => Number(project.year));
  assert.equal(Math.min(...years), 2022);
  assert.equal(Math.max(...years), 2025);
});

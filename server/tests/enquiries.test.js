const { test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../server");
const Enquiry = require("../models/Enquiry");
test("enquiry validation, unavailable storage, and confirmed persistence", async () => {
  const server = app.listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/enquiries`;
  const send = body => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const valid = { name: " QA ", email: "qa@example.com", message: "Local test only" };
  const create = Enquiry.create;
  const ready = Enquiry.db.readyState;
  try {
    for (const body of [{}, { ...valid, name: {} }, { ...valid, message: " " }, { ...valid, message: "x".repeat(3001) }]) assert.equal((await send(body)).status, 400);
    Enquiry.db.readyState = 0;
    assert.equal((await send(valid)).status, 503);
    assert.equal((await send({ ...valid, website: "spam" })).status, 204);
    Enquiry.db.readyState = 1;
    let saved;
    Enquiry.create = async value => { saved = value; };
    const response = await send(valid);
    assert.equal(response.status, 201);
    assert.equal((await response.json()).ok, true);
    assert.equal(saved.name, "QA");
    assert.equal((await send(valid)).status, 201);
    assert.equal((await send(valid)).status, 429);
  } finally {
    Enquiry.create = create;
    Enquiry.db.readyState = ready;
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});

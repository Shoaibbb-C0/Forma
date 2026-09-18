const { chromium, firefox, webkit } = require('playwright');
const { mkdirSync, writeFileSync } = require('node:fs');
const assert = require('node:assert/strict');
const output = process.env.QA_OUTPUT || 'qa-artifacts';
mkdirSync(output, { recursive: true });
const origin = process.env.QA_URL || 'http://127.0.0.1:4173';
const routes = ['/', '/work', '/studio', '/services', '/journal', '/contact', '/work/house-on-the-ridge', '/work/common-ground', '/work/courtyard-house', '/work/north-light-gallery', '/work/the-long-table', '/work/monsoon-house', '/journal/the-case-for-slow-rooms', '/journal/material-is-a-memory', '/journal/drawing-the-in-between', '/missing'];
const results = [];
const widths = process.env.QA_INTERACTIONS_ONLY ? [] : process.env.QA_WIDTHS ? process.env.QA_WIDTHS.split(',').map(Number) : [320,390,768,1024,1440,1920];
(async () => {
  for (const [name, engine, options] of [['Chrome', chromium, { channel: 'chrome' }], ['Edge', chromium, { channel: 'msedge' }], ['Firefox', firefox, {}], ['WebKit', webkit, {}]]) {
    if (process.env.QA_BROWSERS && !process.env.QA_BROWSERS.split(',').includes(name)) continue;
    let browser;
    try {
      browser = await engine.launch(options);
      const context = await browser.newContext();
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const width of widths) {
        await page.setViewportSize({ width, height: width < 650 ? 844 : 900 });
        for (const route of routes) {
          await page.goto(origin + route);
          await page.waitForTimeout(1100);
          assert.equal(await page.locator('h1').count(), 1, `${route}: one h1`);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${name} ${width} ${route}: overflow`);
          for (let y = 0, height = await page.evaluate(() => document.body.scrollHeight); y < height; y += 700) {
            await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y);
            await page.waitForTimeout(50);
          }
          await page.waitForTimeout(500);
          assert.equal(await page.evaluate(() => [...document.images].some(image => image.complete && image.naturalWidth === 0)), false, `${route}: broken image`);
        }
        console.log(`${name} ${width}px: ${routes.length} routes passed`);
      }
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(origin + '/work');
      await page.getByRole('button', { name: 'Residential', exact: true }).click();
      assert.equal(await page.locator('.catalogue-row').count(), 3);
      await page.getByRole('button', { name: 'All', exact: true }).click();
      await page.locator('.catalogue-row').first().hover();
      await page.waitForTimeout(400);
      assert.equal(await page.locator('.catalogue-preview').first().evaluate(el => getComputedStyle(el).opacity), '1');
      await page.evaluate(() => scrollTo({ top: 200, behavior: 'instant' }));
      await page.locator('.catalogue-row').first().click();
      await page.waitForURL('**/work/house-on-the-ridge');
      await page.reload();
      await page.waitForFunction(() => document.title.includes('House on the Ridge'));
      assert.match(await page.title(), /House on the Ridge/);
      await page.goBack();
      await page.waitForTimeout(900);
      assert.equal(new URL(page.url()).pathname, '/work');
      await page.goForward();
      await page.waitForTimeout(900);
      assert.equal(new URL(page.url()).pathname, '/work/house-on-the-ridge');
      await page.goto(origin + '/contact');
      await page.route('**/enquiries', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"Unavailable"}' }));
      await page.getByLabel('Name', { exact: true }).fill('QA visitor');
      await page.getByLabel('Email', { exact: true }).fill('qa@example.com');
      await page.getByLabel('Message', { exact: true }).fill('A residential project in Mumbai.');
      if (await page.getByRole('button', { name: 'Prepare email' }).count()) {
        await page.getByRole('button', { name: 'Prepare email' }).click();
        const draft = await page.getByRole('link', { name: /Open email draft/ }).getAttribute('href');
        assert.ok(decodeURIComponent(draft).includes('A residential project in Mumbai.'));
        assert.equal(await page.getByLabel('Message', { exact: true }).inputValue(), 'A residential project in Mumbai.');
      } else {
      await page.getByRole('button', { name: /Send enquiry/ }).click();
      await page.waitForFunction(() => document.querySelector('.enquiry-feedback--error'));
      assert.equal(await page.getByLabel('Message', { exact: true }).inputValue(), 'A residential project in Mumbai.');
      await page.unroute('**/enquiries');
      await page.route('**/enquiries', route => route.fulfill({ status: 201, contentType: 'application/json', body: '{"ok":true}' }));
      await page.getByRole('button', { name: /Send enquiry/ }).click();
      await page.waitForFunction(() => document.querySelector('.enquiry-feedback--success'));
      assert.equal(await page.getByLabel('Message', { exact: true }).inputValue(), '');
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(origin);
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      assert.equal(await page.locator('main').evaluate(el => el.inert), true);
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('button', { name: 'Menu', exact: true }).getAttribute('aria-expanded'), 'false');
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      await page.getByRole('navigation').getByRole('link', { name: /Projects/ }).click();
      await page.waitForURL('**/work');
      await page.waitForFunction(() => !document.querySelector('main').inert);
      assert.equal(await page.locator('main').evaluate(el => el.inert), false);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(origin + '/work/house-on-the-ridge');
      assert.equal(await page.locator('.route-curtain').count(), 0);
      for (const [route, width, label] of [['/', 390, 'home-phone'], ['/', 1440, 'home-desktop'], ['/work/house-on-the-ridge', 1440, 'project'], ['/studio', 768, 'studio-tablet'], ['/contact', 390, 'contact-phone']]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(origin + route);
        await page.waitForTimeout(600);
        const height = await page.evaluate(() => document.body.scrollHeight);
        for (let y = 0; y < height; y += 600) { await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(80); }
        await page.waitForTimeout(1200);
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: `${output}/${name}-${label}.png`, fullPage: true });
      }
      assert.deepEqual(errors, []);
      results.push({ browser: name, status: 'passed', routes: routes.length, widths, interactions: 'filters, hover, transitions, direct URL, refresh, back/forward, menu, reduced motion, configured contact workflow' });
      console.log(`${name}: interactions passed`);
    } catch (error) {
      results.push({ browser: name, status: 'failed', error: error.message });
      console.error(`${name}: ${error.stack}`);
    } finally { await browser?.close(); }
  }
  writeFileSync(`${output}/browser-results-${process.env.QA_BROWSERS || 'all'}.json`, JSON.stringify(results, null, 2));
  if (results.some(result => result.status !== 'passed')) process.exitCode = 1;
})();

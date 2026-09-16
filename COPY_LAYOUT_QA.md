# Hero layout and copy cleanup

Replaced the homepage's absolute-positioned text/photo composition with independent grid areas. Desktop/tablet use two columns; phones place the heading, supporting line, photograph, and caption in sequence. Removed the heading's scroll translation and changed the photograph entrance to opacity so motion does not move the image into text.

Trimmed repetitive introductory slogans, decorative counters, duplicate project description/image-count/end markers, secondary studio and contact explanations, repeated service scope lines, journal action labels, the identical filler body previously rendered for all three journal notes, footer descriptor, and unverified navigation establishment text. Preserved actual project facts, article-specific excerpts, service descriptions, navigation, enquiry labels, and error/success feedback. Elite product-building guidance informed the separation and concise copy; React guidance was used to review affected components. No backend or hosting changes.

Verification:

- Hero bounding-box checks at 320, 375, 390, 430, 768, 930, 1024, 1280, 1440, and 1920px: no text/photo intersection, clipped heading containers, or horizontal document overflow; hero image loaded.
- Visual captures inspected for the hero at 390, 768, and 930px, plus the simplified services page/conclusion.
- All secondary pages, six case studies, three journal notes, and 404 checked at 320, 768, and 1440px: H1 present, no horizontal document overflow or Vite overlay.
- Residential filter returns three projects; All restores six. Mobile menu link to Studio navigates and closes the menu.
- Browser error-log check returned no errors. Existing browser CLI was unavailable; used in-app browser. Temporary viewport override reset.
- `npm run build`, `node --test client/tests/catalogue.test.mjs`, and `git diff --check` passed. Node tests emit an existing module-type notice.

These are representative viewport checks, not a guarantee for every physical device. Enquiry delivery remains outside this change and was not retested.

## Follow-up: persistent hero rules and caption removal

The supplied follow-up screenshot still showed the old overlapping composition. Removed that composition from the original stylesheet, including conflicting tablet/mobile rules; the hero no longer depends on a separately loaded override. A refreshed development page and production preview both render the grid layout. This establishes the current code/build behavior, not the cause of the user's older screenshot.

Removed all decorative photographic captions, the hero project/year caption, scroll prompt, selected-work date/category label, archive date/count label, and case-study section number. Project identities and facts remain where useful for navigation and case-study information.

Hero overlap/overflow checks passed at 320, 390, 768, 1024, 1440, 1847 (supplied screenshot width), and 1920px. Production preview additionally checked phone/tablet/desktop geometry and six case-study pages for absence of photographic captions. Build, three catalogue tests, and diff checks passed. In-app browser used because the browser CLI is unavailable; no public hosting deployment was performed.

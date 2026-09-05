# Acceptance

- Every named page type renders and missing slugs return 404.
- Navigation, mobile menu, enquiry and editor actions function.
- Concept labels and photography credits prevent false work claims.
- Server validation, atomic rate limiting, same-origin writes and allowlisted editor authorization enforced.
- Drafts are excluded from public queries; published content survives reload.
- Enquiries persist in D1 and remain editor-only.
- Responsive layouts fit 320–1920px; semantic headings, labels and focus states.
- Unique SEO metadata, canonical URLs, sitemap and private-development robots policy.
- Production build and functional route/security checks pass; private deployment verified.

## Verification record

- TypeScript passed; production Worker build passed.
- Public page routes, project/article detail, sitemap and robots return successfully; unknown pages return 404.
- Anonymous CMS and inbox writes return 403; cross-origin enquiry returns 403; invalid enquiry returns 400; the hourly limit returns 429.
- Local D1 enquiry creation returned 201, with browser success confirmation. Temporary QA submissions removed.
- Authorized local test identity accessed editor; save draft → public 404, publish → 200, unpublish → 404. Invalid image origin rejected. Local test identity removed from allowlist after verification; hosted editor is restricted to the supplied email.
- Browser mobile navigation, editor tabs, structured fields and enquiry submission verified. WebMCP service configuration changes the visible form and rejects invalid input.
- Homepage overflow checks passed at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920. All public page types checked at 320; Studio heading adjusted and rechecked.
- Production dependency audit: zero known vulnerabilities. Development tooling still has advisories; no development server is exposed by deployment.
- Private-development robots intentionally disallows crawling. Email notifications are not part of this release; enquiries are stored for editor review.

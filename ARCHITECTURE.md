# Forma — experience & technical blueprint

## Positioning and conversion
Forma is an architecture and design practice for thoughtful residential and commercial spaces. The site leads visitors from an image-led introduction to selected work, then to a clear project enquiry or consultation request.

**Journey:** Home → selected project → case-study narrative → enquiry / consultation. Journal and services build trust for visitors still choosing a studio.

## Sitemap and hierarchy
- Home: statement, current work, approach, services, invitation.
- Work: asymmetric project archive with category filtering.
- Work detail: premise, facts, gallery, outcome, next project.
- Services, Studio, Journal, Journal detail, Contact and 404.

## Reusable content system
Projects hold title, slug, sector, location, year, summary, premise, scope, cover and gallery. Articles hold title, slug, author, date, excerpt, cover and structured body. Settings holds contact and social details. The Express API provides public reads and a key-protected content refresh endpoint; MongoDB models make the same content editable when `MONGODB_URI` is configured. Seed data is used when developing without a database.

## Design and motion
Warm stone, ink and muted green form the palette. A condensed display face gives project titles their architectural scale; a neutral sans supports reading. The image ratio changes intentionally across the archive. Motion uses a single calm curve, opacity, clipping and short translations. It respects reduced-motion and never hides essential content behind hover.

## Responsive, quality and safety
The layout begins at 320px and uses always-visible metadata and tap-safe cards; pointer interactions only enhance larger screens. Images are lazy-loaded and locally optimized-sized source images. Forms validate in browser and server, include a honeypot and rate limiting, and return accessible status messages. Semantic landmarks, keyboard navigation, focus visibility, descriptive alt text, metadata, robots and sitemap are included. Verification covers linting, production build, routing and the enquiry endpoint.

## Deployment
Deploy `client` to Vercel/Netlify and `server` to Render/Railway. Supply `VITE_API_URL`, `MONGODB_URI`, `ADMIN_API_KEY`, and email-provider variables from `.env.example`; no secret is committed.

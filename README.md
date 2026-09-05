# Forma

Forma is an editorial architecture and interiors studio website with a server-rendered portfolio, journal, protected studio CMS, and private enquiry inbox.

## Project structure

```text
app/                         Framework routes, metadata, and API boundaries
  api/                       Thin HTTP endpoints for editor and enquiry flows
  work/ journal/             Public content routes
  editor/                    Protected CMS route
src/
  components/                Shared site, form, and UI primitives
  content/                   Initial project and journal content
  features/                  Enquiry and CMS client features
  lib/                       Shared utility functions
  server/
    database/                D1 repository and Drizzle schema
    http/                    Request validation, authorization, rate limits
docs/                        Product brief, data model, architecture, design, QA
drizzle/                     Immutable D1 migration history
public/                      Static public assets
```

## Local development

```bash
npm run dev
npm run build
npm run lint
npm run db:generate
```

The development server uses the Sites local identity. To access the editor locally, temporarily include the local test email in `.env`; never commit `.env`.

## Content and operations

- Public projects and journal articles are read from D1.
- `/editor` requires ChatGPT sign-in and an `EDITOR_EMAILS` server allowlist.
- Content can be saved as a draft or published. Draft content stays private.
- Enquiries are validated, rate-limited, stored in D1, and viewable only in the editor inbox.
- Reference imagery must use the approved Unsplash source pattern enforced by the editor endpoint.

Read [docs/architecture.md](docs/architecture.md), [docs/data-model.md](docs/data-model.md), and [docs/acceptance.md](docs/acceptance.md) before changing infrastructure or persistent data.

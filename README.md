# Forma — Architecture Studio Website

A responsive, image-led portfolio for a fictional architecture and design practice.

Forma was created as an agency portfolio project to demonstrate premium web design, editorial typography, responsive development, purposeful motion, project storytelling, Express API development, form validation, and production deployment.

## Live website

[View Forma on Vercel](https://forma-beta-two.vercel.app/)

## Features

- Art-directed architecture portfolio
- Six residential and commercial projects
- Project filtering and individual case-study routes
- Dedicated services, studio, journal, article, contact, and 404 pages
- Responsive navigation and touch-friendly mobile menu
- Accessible enquiry form with loading, success, and error feedback
- Express API with server validation, rate limiting, and spam protection
- MongoDB-backed enquiry storage
- Purposeful GSAP hero animation
- Reduced-motion support
- Responsive layouts from 320px to large desktop screens
- Locally stored, licensed Unsplash photography
- Vercel frontend and backend deployment support

## Technology

### Frontend

- React
- Vite
- React Router
- GSAP
- CSS
- JavaScript

### Backend

- Node.js
- Express
- Express Rate Limit
- Mongoose
- MongoDB enquiry persistence

### Deployment

- Vercel
- GitHub

## Project structure

```text
Forma/
├── client/
│   ├── public/assets/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── main.jsx
│   │   └── styles.css
│   └── vercel.json
├── server/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── server.js
├── brand-assets/
├── ARCHITECTURE.md
└── README.md
```

## Local development

Install the root, frontend, and backend dependencies:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Create `server/.env`:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

Start both applications:

```bash
npm run dev
```

The frontend normally runs at `http://localhost:5173` and the API runs at `http://localhost:5000`.

The API health endpoint is available at `http://localhost:5000/api/health`.

## Deployment environment variables

Set these values in the corresponding Vercel project settings.

Frontend:

```env
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

Backend:

```env
CLIENT_ORIGIN=https://your-frontend-domain.vercel.app
```

Browsing the portfolio does not require MongoDB. Set `MONGODB_URI` to enable enquiry submissions; the API will not report success without persistent storage.

Local environment files are ignored by Git and must never be committed.

## Enquiry behavior

The enquiry form validates submissions in the browser and on the server. It includes rate limiting and a hidden spam field.

MongoDB must be connected for the API to confirm an enquiry. Without it, the API returns 503 and the form preserves the message with an email fallback. The server does not log personal enquiry details. Transactional email delivery is not configured.

## Content management

Portfolio projects and journal articles are stored in `client/src/data/content.js`. Shared interface elements are in `client/src/components`, and individual routes are in `client/src/pages`.

This keeps demonstration content separate from the presentation layer and makes a future CMS migration straightforward.

## Design direction

Forma uses warm neutral surfaces, muted green accents, editorial serif display typography, precise sans-serif interface typography, asymmetric project layouts, large-format photography, controlled transitions, and generous negative space.

## Image licensing

The demonstration photography was downloaded from Unsplash and is used under the Unsplash License. Asset information and brand guidance are documented in `brand-assets/README.md`.

## Project status

Forma is complete as an agency portfolio demonstration. MongoDB, a visual content-management interface, and transactional email delivery can be added if the project is extended into a live architecture-practice website.

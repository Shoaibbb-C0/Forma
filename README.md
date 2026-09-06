# Forma

An image-led architecture and design-practice portfolio, built as a MERN demo with a React/Vite client and Express/Mongo API.

## Run locally

1. Copy `.env.example` to `.env` and fill variables as needed.
2. Run `npm install`, then `npm install --prefix client` and `npm install --prefix server`.
3. Run `npm run dev`.

The site runs at the URL Vite displays (usually `http://localhost:5173`); the API runs on port 5000. Without `MONGODB_URI`, the public site still runs and successful enquiry submissions are logged only. Set MongoDB to retain enquiries.

## CMS/content workflow

Project and article content is deliberately kept in the client seed collection for the visual demo. The Express service is prepared for MongoDB persistence and safe form handling. For production, move the `projects` and `articles` collections from `client/src/main.jsx` into Mongo models and expose public read plus `ADMIN_API_KEY`-protected editor endpoints. This keeps editorial content separate from presentation while retaining the chosen MERN stack.

## Deployment

Deploy `client` to Vercel or Netlify and `server` to Render/Railway. Set `VITE_API_URL` to the deployed API URL, and set `CLIENT_ORIGIN`, `MONGODB_URI`, and `ADMIN_API_KEY` on the server.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the experience and implementation blueprint, and [brand-assets/README.md](brand-assets/README.md) for brand and asset guidance.

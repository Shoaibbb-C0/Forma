# Forma

I made Forma as a practice project for a fictional architecture studio. I wanted visitors to be able to look through projects, learn about the studio, and send an enquiry.

[View the website](https://forma-beta-two.vercel.app/)

## What it can do

- Show six example architecture projects
- Filter projects and open project pages
- Browse the studio, services, and journal pages
- Send an enquiry through a form
- Work on mobile and desktop

## Tools used

React, Vite, React Router, GSAP, Node.js, Express, MongoDB

## Run it on your computer

You need Node.js and npm.

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
MONGODB_URI=your_mongodb_connection_string
```

Then run:

```bash
npm run dev
```

The website runs at `http://localhost:5173`. The API runs at `http://localhost:5000`.

The enquiry form needs MongoDB to save messages. Keep your real connection details private.

## Where to change the content

Project and journal content is in `client/src/data/content.js`.
